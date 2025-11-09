// Villages Connect Theme Configuration
// Senior-friendly theme with large fonts and high contrast colors

export const theme = {
  colors: {
    // High contrast color palette
    primary: '#0066CC',      // Bright blue for primary actions
    primaryHover: '#004499', // Darker blue for hover states
    secondary: '#FF6600',    // Orange for secondary actions
    secondaryHover: '#CC5200', // Darker orange for hover
    success: '#28A745',      // Green for success states
    warning: '#FFC107',      // Yellow for warnings
    error: '#DC3545',        // Red for errors
    info: '#17A2B8',         // Teal for info

    // Background colors
    background: '#FFFFFF',   // Pure white background
    surface: '#F8F9FA',      // Light gray surface
    card: '#FFFFFF',         // White cards
    overlay: 'rgba(0, 0, 0, 0.5)', // Dark overlay for modals

    // Text colors
    textPrimary: '#000000',  // Pure black for primary text
    textSecondary: '#333333', // Dark gray for secondary text
    textMuted: '#666666',    // Medium gray for muted text
    textInverse: '#FFFFFF',  // White text on dark backgrounds

    // Border colors
    border: '#CCCCCC',       // Light gray borders
    borderFocus: '#0066CC',  // Blue focus indicator
  },

  typography: {
    // Large font sizes for senior accessibility
    fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',

    fontSizes: {
      xs: '14px',   // Minimum readable size
      sm: '16px',   // Standard readable size
      md: '18px',   // Medium size
      lg: '24px',   // Large size
      xl: '32px',   // Extra large
      xxl: '48px',  // Very large for headings
    },

    fontWeights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },

    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },

  spacing: {
    // Generous spacing for touch targets
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '50%',
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  },

  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },

  // Component-specific styles
  components: {
    button: {
      minHeight: '48px',     // Minimum touch target size
      minWidth: '48px',      // Minimum touch target width
      fontSize: '18px',      // Large readable text
      padding: '12px 24px',  // Generous padding
      borderRadius: '8px',
    },

    input: {
      minHeight: '48px',     // Minimum touch target
      fontSize: '18px',      // Large readable text
      padding: '12px 16px',  // Generous padding
      borderRadius: '8px',
      borderWidth: '2px',    // Thick borders for visibility
    },

    card: {
      padding: '24px',
      borderRadius: '12px',
      borderWidth: '2px',
    },

    modal: {
      maxWidth: '90vw',      // Responsive sizing
      maxHeight: '90vh',
      padding: '32px',
    },
  },

  // Animation settings
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

// Type definitions for TypeScript
export type Theme = typeof theme;

export type ColorKeys = keyof typeof theme.colors;
export type FontSizeKeys = keyof typeof theme.typography.fontSizes;
export type SpacingKeys = keyof typeof theme.spacing;
export type BorderRadiusKeys = keyof typeof theme.borderRadius;
export type ShadowKeys = keyof typeof theme.shadows;
export type BreakpointKeys = keyof typeof theme.breakpoints;
export type ZIndexKeys = keyof typeof theme.zIndex;