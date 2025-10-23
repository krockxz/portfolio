import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiClock, FiTrendingUp } from 'react-icons/fi';

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
  <div className="github-activity loading">
    <div className="activity-header">
      <div className="header-content">
        <FiGithub className="github-icon" />
        <h2>GitHub Activity</h2>
      </div>
      <div className="loading-spinner">Loading...</div>
    </div>
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <div className="github-activity error">
    <div className="activity-header">
      <div className="header-content">
        <FiGithub className="github-icon" />
        <h2>GitHub Activity</h2>
      </div>
      <div className="error-message">
        <p>Unable to load activity</p>
        <small>{error}</small>
      </div>
    </div>
  </div>
);

const StatItem = ({ value, label }: { value: number; label: string }) => (
  <div className="stat-item">
    <span className="stat-value">{value.toLocaleString()}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const ContributionGrid = ({ contributions }: { contributions: ContributionDay[] }) => {
  const gridData = useMemo(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 365);
    
    const contributionMap = new Map(contributions.map(c => [c.date, c]));
    const weeks = [];
    
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
    }
    
    return weeks;
  }, [contributions]);

  return (
    <div className="contribution-grid">
      <div className="grid-container">
        {gridData.map((week, weekIndex) => (
          <div key={weekIndex} className="week-column">
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                className="contribution-day"
                style={{
                  backgroundColor: day.color,
                  opacity: day.isFuture ? 0.3 : 1
                }}
                title={`${day.date}: ${day.count} contributions`}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2 }}
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
      </div>
    </div>
  );
};

const ActivityFooter = ({ username }: { username: string }) => (
  <div className="activity-footer">
    <div className="offline-status">
      <FiClock className="status-icon" />
      <span>Offline in <span className="cursor-icon">📦</span> Cursor - Yesterday worked <strong>2h 56m</strong></span>
    </div>
    <motion.a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="github-link"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiTrendingUp className="link-icon" />
      <span>View on GitHub</span>
    </motion.a>
  </div>
);

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
        <div className="activity-header">
          <div className="header-content">
            <FiGithub className="github-icon" />
            <div className="header-text">
              <h2>GitHub Activity</h2>
              <p>{data.username}'s coding journey over the past year</p>
            </div>
          </div>
        </div>

        <div className="activity-stats">
          <StatItem value={data.totalContributions} label="Contributions" />
          <StatItem value={data.currentStreak} label="Current Streak" />
          <StatItem value={data.longestStreak} label="Longest Streak" />
        </div>

        <div className="activity-content">
          <ContributionGrid contributions={data.contributions} />
        </div>

        <ActivityFooter username={data.username} />
      </div>
    </motion.section>
  );
};

export default GitHubActivity;