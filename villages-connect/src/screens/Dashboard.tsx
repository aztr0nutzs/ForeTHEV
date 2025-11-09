import React from 'react';
import { theme } from '../themes';
import { Button, Navigation } from '../components';

// Dashboard component for Villages Connect
const Dashboard: React.FC = () => {
  // Sample dashboard data - in a real app, this would come from props or state
  const userName = "John Doe";
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const quickActions = [
    { id: 'events', title: 'Events', description: 'View upcoming community events', icon: '📅' },
    { id: 'directory', title: 'Directory', description: 'Find residents and services', icon: '📖' },
    { id: 'messages', title: 'Messages', description: 'Check your messages', icon: '💬' },
    { id: 'emergency', title: 'Emergency', description: 'Emergency contacts and info', icon: '🚨' },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Community Meeting',
      message: 'Monthly community meeting this Thursday at 2 PM in the clubhouse.',
      date: '2024-01-15',
      priority: 'normal' as const,
    },
    {
      id: 2,
      title: 'Weather Alert',
      message: 'Heavy rain expected tomorrow. Please take precautions.',
      date: '2024-01-14',
      priority: 'high' as const,
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
        color: theme.colors.textPrimary,
      }}
    >
      <Navigation />

      {/* Header */}
      <header
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.textInverse,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.md,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: theme.typography.fontSizes.xxl,
                fontWeight: theme.typography.fontWeights.bold,
                margin: 0,
                marginBottom: theme.spacing.sm,
              }}
            >
              Villages Connect
            </h1>
            <p
              style={{
                fontSize: theme.typography.fontSizes.lg,
                margin: 0,
                opacity: 0.9,
              }}
            >
              Welcome back, {userName}
            </p>
          </div>
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontSize: theme.typography.fontSizes.xl,
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              {currentTime}
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSizes.md,
                opacity: 0.8,
              }}
            >
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: theme.spacing.xl,
        }}
      >
        {/* Quick Actions Grid */}
        <section style={{ marginBottom: theme.spacing.xxxl }}>
          <h2
            style={{
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.bold,
              marginBottom: theme.spacing.xl,
              color: theme.colors.textPrimary,
            }}
          >
            Quick Actions
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: theme.spacing.xl,
            }}
          >
            {quickActions.map((action) => (
              <div
                key={action.id}
                style={{
                  backgroundColor: theme.colors.card,
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: theme.components.card.borderRadius,
                  padding: theme.components.card.padding,
                  boxShadow: theme.shadows.sm,
                  transition: theme.transitions.normal,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme.shadows.md;
                  e.currentTarget.style.borderColor = theme.colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme.shadows.sm;
                  e.currentTarget.style.borderColor = theme.colors.border;
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: theme.spacing.lg,
                    textAlign: 'center',
                  }}
                >
                  {action.icon}
                </div>
                <h3
                  style={{
                    fontSize: theme.typography.fontSizes.lg,
                    fontWeight: theme.typography.fontWeights.bold,
                    marginBottom: theme.spacing.md,
                    textAlign: 'center',
                  }}
                >
                  {action.title}
                </h3>
                <p
                  style={{
                    fontSize: theme.typography.fontSizes.md,
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.lg,
                    textAlign: 'center',
                    lineHeight: theme.typography.lineHeights.normal,
                  }}
                >
                  {action.description}
                </p>
                <div style={{ textAlign: 'center' }}>
                  <Button variant="primary" size="md">
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Announcements Section */}
        <section>
          <h2
            style={{
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.bold,
              marginBottom: theme.spacing.xl,
              color: theme.colors.textPrimary,
            }}
          >
            Announcements
          </h2>
          <div
            style={{
              display: 'grid',
              gap: theme.spacing.lg,
            }}
          >
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                style={{
                  backgroundColor: announcement.priority === 'high' ? '#FFF3CD' : theme.colors.card,
                  border: `2px solid ${announcement.priority === 'high' ? theme.colors.warning : theme.colors.border}`,
                  borderRadius: theme.components.card.borderRadius,
                  padding: theme.components.card.padding,
                  boxShadow: theme.shadows.sm,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <h3
                    style={{
                      fontSize: theme.typography.fontSizes.lg,
                      fontWeight: theme.typography.fontWeights.bold,
                      margin: 0,
                      color: theme.colors.textPrimary,
                    }}
                  >
                    {announcement.title}
                  </h3>
                  <span
                    style={{
                      fontSize: theme.typography.fontSizes.sm,
                      color: theme.colors.textMuted,
                      backgroundColor: theme.colors.surface,
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderRadius: theme.borderRadius.sm,
                    }}
                  >
                    {new Date(announcement.date).toLocaleDateString()}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: theme.typography.fontSizes.md,
                    color: theme.colors.textSecondary,
                    margin: 0,
                    lineHeight: theme.typography.lineHeights.normal,
                  }}
                >
                  {announcement.message}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: theme.colors.surface,
          borderTop: `1px solid ${theme.colors.border}`,
          padding: theme.spacing.xl,
          marginTop: theme.spacing.xxxl,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: theme.typography.fontSizes.md,
              color: theme.colors.textSecondary,
              margin: 0,
            }}
          >
            © 2024 Villages Connect. Designed for The Villages, FL community.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;