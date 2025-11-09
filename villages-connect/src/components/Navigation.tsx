import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../themes';

// Navigation item interface
interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

// Navigation component props
interface NavigationProps {
  className?: string;
}

// Senior-friendly navigation component
const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const location = useLocation();

  // Navigation items for Villages Connect
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/',
      icon: '🏠',
    },
    {
      id: 'events',
      label: 'Events',
      path: '/events',
      icon: '📅',
    },
    {
      id: 'directory',
      label: 'Directory',
      path: '/directory',
      icon: '📖',
    },
    {
      id: 'messages',
      label: 'Messages',
      path: '/messages',
      icon: '💬',
    },
    {
      id: 'emergency',
      label: 'Emergency',
      path: '/emergency',
      icon: '🚨',
    },
  ];

  return (
    <nav
      className={`villages-navigation ${className}`}
      style={{
        backgroundColor: theme.colors.surface,
        borderBottom: `2px solid ${theme.colors.border}`,
        padding: theme.spacing.md,
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.sticky,
        boxShadow: theme.shadows.sm,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: theme.spacing.md,
        }}
      >
        {/* Logo/Brand */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: theme.colors.textPrimary,
            fontSize: theme.typography.fontSizes.xl,
            fontWeight: theme.typography.fontWeights.bold,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
          }}
        >
          <span style={{ fontSize: '32px' }}>🌴</span>
          <span>Villages Connect</span>
        </Link>

        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.md,
                  textDecoration: 'none',
                  color: isActive ? theme.colors.primary : theme.colors.textPrimary,
                  backgroundColor: isActive ? theme.colors.primary + '10' : 'transparent',
                  border: `2px solid ${isActive ? theme.colors.primary : 'transparent'}`,
                  fontSize: theme.typography.fontSizes.lg,
                  fontWeight: theme.typography.fontWeights.medium,
                  minHeight: '56px', // Large touch target
                  minWidth: '120px', // Consistent width for alignment
                  justifyContent: 'center',
                  transition: theme.transitions.normal,
                  boxShadow: isActive ? theme.shadows.sm : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = theme.colors.surface;
                    e.currentTarget.style.borderColor = theme.colors.border;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <span
                  style={{
                    fontSize: '24px',
                    lineHeight: 1,
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Menu */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md,
          }}
        >
          <div
            style={{
              fontSize: theme.typography.fontSizes.md,
              color: theme.colors.textSecondary,
            }}
          >
            Welcome, John
          </div>
          <button
            style={{
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.border}`,
              backgroundColor: 'transparent',
              color: theme.colors.textPrimary,
              fontSize: theme.typography.fontSizes.lg,
              cursor: 'pointer',
              minHeight: '48px',
              minWidth: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: theme.transitions.normal,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.surface;
              e.currentTarget.style.borderColor = theme.colors.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = theme.colors.border;
            }}
            title="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;