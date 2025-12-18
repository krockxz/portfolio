import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Types
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
  username: string;
}

// Constants - Modern color scheme matching website theme
const CONTRIBUTION_LEVELS = [
  { min: 0, max: 0, color: '#161b22' }, // No contributions - dark with subtle blue tint
  { min: 1, max: 3, color: '#0e4429' }, // Low contributions - dark green
  { min: 4, max: 6, color: '#006d32' }, // Medium-low contributions - medium green
  { min: 7, max: 9, color: '#26a641' }, // Medium-high contributions - bright green
  { min: 10, max: Infinity, color: '#39d353' } // High contributions - vibrant green
];

const GITHUB_USERNAME = 'krockxz';

// Utility functions
const getContributionLevel = (count: number): number => {
  return CONTRIBUTION_LEVELS.findIndex(level => count >= level.min && count <= level.max);
};

const getContributionColor = (level: number): string => {
  return CONTRIBUTION_LEVELS[level]?.color || CONTRIBUTION_LEVELS[0].color;
};

const calculateStreak = (contributions: ContributionDay[], fromToday = true): number => {
  const today = new Date();
  let streak = 0;
  const contributionMap = new Map(contributions.map(c => [c.date, c]));

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const day = contributionMap.get(dateStr);
    if (day && day.contributionCount > 0) {
      streak++;
    } else if (fromToday) {
      break;
    }
  }

  return streak;
};

// Custom hooks
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

        const query = `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);

        const user = result.data.user;
        if (!user) throw new Error('User not found');

        const contributions = user.contributionsCollection.contributionCalendar.weeks
          .flatMap((week: any) => week.contributionDays)
          .map((day: any) => ({
            date: day.date,
            contributionCount: day.contributionCount,
            color: day.color
          }));

        setData({
          totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
          contributions,
          currentStreak: calculateStreak(contributions, true),
          longestStreak: calculateStreak(contributions, false),
          username: GITHUB_USERNAME
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

// Components
const LoadingState = () => (
  <motion.section
    className="github-activity loading"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="activity-container" style={{ minHeight: '200px' }}>
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

const ContributionGrid = ({ contributions, totals, currentStreak, longestStreak }: { contributions: ContributionDay[]; totals: number; currentStreak: number; longestStreak: number; }) => {
  const gridData = useMemo(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 365);

    const contributionMap = new Map(contributions.map(c => [c.date, c]));
    const weeks = [];
    const months: { name: string; index: number }[] = [];

    for (let week = 0; week < 53; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + (week * 7) + day);
        const dateStr = date.toISOString().split('T')[0];

        const contribution = contributionMap.get(dateStr);
        const count = contribution ? contribution.contributionCount : 0;
        const level = getContributionLevel(count);

        weekDays.push({
          date: dateStr,
          count,
          level,
          color: getContributionColor(level),
          isFuture: date > today
        });
      }
      weeks.push(weekDays);

      // Month calculation
      const firstDayOfWeek = new Date(weekDays[0].date);
      const prevWeekFirstDay = week > 0 ? new Date(new Date(startDate).setDate(new Date(startDate).getDate() + ((week - 1) * 7))) : null;

      if (!prevWeekFirstDay || firstDayOfWeek.getMonth() !== prevWeekFirstDay.getMonth()) {
        months.push({
          name: firstDayOfWeek.toLocaleString('default', { month: 'short' }),
          index: week
        });
      } else {
        months.push({ name: '', index: week });
      }
    }

    // Filter months to avoid overcrowding, especially at the start
    // If the first month label is excessively close to the second one (e.g., Dec starts at index 0, Jan at index 2),
    // hide the first one.
    const filledIndices = months.map((m, i) => m.name ? i : -1).filter(i => i !== -1);

    if (filledIndices.length >= 2) {
      if (filledIndices[1] - filledIndices[0] < 4) { // Less than 4 weeks gap
        // Remove the first label (e.g. Dec) in favor of the second (e.g. Jan)
        months[filledIndices[0]].name = '';
      }
    }

    return { weeks, months };
  }, [contributions]);

  return (
    <div className="contribution-grid">
      <div className="grid-container">
        {gridData.weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="week-column" style={{ position: 'relative' }}>
            {gridData.months[weekIndex].name && (
              <span style={{
                position: 'absolute',
                top: '-20px',
                left: 0,
                color: 'var(--light-slate)',
                fontSize: '12px',
                fontFamily: 'var(--fira-code)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none', // Prevent interference
              }}>
                {gridData.months[weekIndex].name}
              </span>
            )}
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                className="contribution-day"
                style={{
                  backgroundColor: day.color,
                  opacity: day.isFuture ? 0.3 : 1
                }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="grid-legend">
        <span>Less</span>
        <div className="legend-squares">
          {CONTRIBUTION_LEVELS.map((level, index) => (
            <div
              key={index}
              className="legend-square"
              style={{ backgroundColor: level.color }}
            />
          ))}
        </div>
        <span>More</span>
        <span className="inline-stats">{totals.toLocaleString()} contributions · {currentStreak} streak · {longestStreak} longest</span>
      </div>
    </div>
  );
};



// Main component
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