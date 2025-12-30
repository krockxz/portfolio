import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const CONTRIBUTION_COLORS = [
  '#161b22', // 0 contributions
  '#0e4429', // 1-3 contributions
  '#006d32', // 4-6 contributions
  '#26a641', // 7-9 contributions
  '#39d353', // 10+ contributions
];

const GITHUB_USERNAME = 'krockxz';
const GITHUB_API_URL = 'https://api.github.com/graphql';

const getColorForCount = (count: number): string => {
  if (count === 0) return CONTRIBUTION_COLORS[0];
  if (count <= 3) return CONTRIBUTION_COLORS[1];
  if (count <= 6) return CONTRIBUTION_COLORS[2];
  if (count <= 9) return CONTRIBUTION_COLORS[3];
  return CONTRIBUTION_COLORS[4];
};

const calculateStreak = (contributions: Map<string, number>, fromToday: boolean): number => {
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    if ((contributions.get(dateStr) ?? 0) > 0) {
      streak++;
    } else if (fromToday) {
      break;
    }
  }

  return streak;
};

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface GitHubActivityData {
  totalContributions: number;
  contributions: ContributionDay[];
  currentStreak: number;
  longestStreak: number;
}

interface WeekDay {
  date: string;
  count: number;
  color: string;
  isFuture: boolean;
}

const useGitHubActivity = () => {
  const [data, setData] = useState<GitHubActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        if (!token || token === 'your_github_personal_access_token') {
          throw new Error('GitHub token not configured');
        }

        const response = await fetch(GITHUB_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `query($username: String!) {
              user(login: $username) {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks { contributionDays { date contributionCount } }
                  }
                }
              }
            }`,
            variables: { username: GITHUB_USERNAME }
          }),
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);

        const user = result.data.user;
        if (!user) throw new Error('User not found');

        const rawContributions = user.contributionsCollection.contributionCalendar.weeks
          .flatMap((week: any) => week.contributionDays);

        const contributions: ContributionDay[] = rawContributions.map((day: any) => ({
          date: day.date,
          contributionCount: day.contributionCount,
          color: getColorForCount(day.contributionCount)
        }));

        const contributionMap = new Map<string, number>(
          contributions.map(c => [c.date, c.contributionCount])
        );

        setData({
          totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
          contributions,
          currentStreak: calculateStreak(contributionMap, true),
          longestStreak: calculateStreak(contributionMap, false),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const LoadingState = () => (
  <motion.section
    className="github-activity loading"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="activity-container">
      <div className="activity-content">
        <div className="loading-spinner">Loading...</div>
      </div>
    </div>
  </motion.section>
);

const ErrorState = ({ error }: { error: string }) => (
  <div className="github-activity error">
    <div className="activity-content">
      <div className="error-message">
        <p>Unable to load activity</p>
        <small>{error}</small>
      </div>
    </div>
  </div>
);

interface ContributionGridProps {
  contributions: ContributionDay[];
  totals: number;
  currentStreak: number;
  longestStreak: number;
}

const ContributionGrid = ({ contributions, totals, currentStreak, longestStreak }: ContributionGridProps) => {
  const gridData = useMemo(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 365);

    const contributionMap = new Map(contributions.map(c => [c.date, c.contributionCount]));
    const weeks: WeekDay[][] = [];
    const monthLabels: string[] = [];

    for (let week = 0; week < 53; week++) {
      const weekDays: WeekDay[] = [];

      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + (week * 7) + day);
        const dateStr = date.toISOString().split('T')[0];
        const count = contributionMap.get(dateStr) ?? 0;

        weekDays.push({
          date: dateStr,
          count,
          color: getColorForCount(count),
          isFuture: date > today
        });
      }

      weeks.push(weekDays);

      const firstDayOfWeek = weekDays[0].date;
      const prevWeekDate = week > 0
        ? new Date(startDate.getTime() + ((week - 1) * 7) * 24 * 60 * 60 * 1000)
        : null;

      const currentMonth = new Date(firstDayOfWeek).toLocaleString('default', { month: 'short' });
      const prevMonth = prevWeekDate
        ? new Date(prevWeekDate).toLocaleString('default', { month: 'short' })
        : '';

      monthLabels.push(currentMonth !== prevMonth ? currentMonth : '');
    }

    // Filter out close adjacent month labels
    const filledIndices = monthLabels
      .map((label, i) => label ? i : -1)
      .filter(i => i !== -1);

    if (filledIndices.length >= 2 && filledIndices[1] - filledIndices[0] < 4) {
      monthLabels[filledIndices[0]] = '';
    }

    return { weeks, monthLabels };
  }, [contributions]);

  return (
    <div className="contribution-grid">
      <div className="grid-months">
        {gridData.monthLabels.map((label, i) => (
          <div key={`month-${i}`} className="month-label">
            {label && <span>{label}</span>}
          </div>
        ))}
      </div>

      <div className="grid-wrapper">
        <div className="day-labels">
          <span className="day-label">Mon</span>
          <span />
          <span className="day-label">Wed</span>
          <span />
          <span className="day-label">Fri</span>
          <span />
          <span />
        </div>
        <div className="grid-container">
          {gridData.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week-column">
              {week.map((day) => (
                <motion.div
                  key={day.date}
                  className="contribution-day"
                  style={{
                    backgroundColor: day.color,
                    opacity: day.isFuture ? 0.3 : 1,
                  }}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid-legend">
        <div className="legend-main">
          <span className="legend-label">Less</span>
          <div className="legend-squares">
            {CONTRIBUTION_COLORS.map((color, index) => (
              <div
                key={index}
                className="legend-square"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="legend-label">More</span>
        </div>
        <div className="grid-stats">
          <span className="stat-item">
            <span className="stat-value">{totals.toLocaleString()}</span>
            <span className="stat-label">contributions</span>
          </span>
          <span className="stat-divider">·</span>
          <span className="stat-item">
            <span className="stat-value">{currentStreak}</span>
            <span className="stat-label">day streak</span>
          </span>
          <span className="stat-divider">·</span>
          <span className="stat-item">
            <span className="stat-value">{longestStreak}</span>
            <span className="stat-label">longest</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const GitHubActivity: React.FC = () => {
  const { data, loading, error } = useGitHubActivity();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  return (
    <motion.section
      className="github-activity"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="activity-container">
        <div className="activity-content">
          <ContributionGrid
            contributions={data.contributions}
            totals={data.totalContributions}
            currentStreak={data.currentStreak}
            longestStreak={data.longestStreak}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default GitHubActivity;
