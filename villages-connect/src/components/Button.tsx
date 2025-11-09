import React from 'react';
import { theme } from '../themes';

// Button variant types
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Button props interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

// Styled button component with senior-friendly design
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className = '',
  style = {},
  ...props
}) => {
  // Get variant colors
  const getVariantColors = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return {
          background: theme.colors.primary,
          hoverBackground: theme.colors.primaryHover,
          color: theme.colors.textInverse,
        };
      case 'secondary':
        return {
          background: theme.colors.secondary,
          hoverBackground: theme.colors.secondaryHover,
          color: theme.colors.textInverse,
        };
      case 'success':
        return {
          background: theme.colors.success,
          hoverBackground: '#218838', // Darker green
          color: theme.colors.textInverse,
        };
      case 'warning':
        return {
          background: theme.colors.warning,
          hoverBackground: '#E0A800', // Darker yellow
          color: theme.colors.textPrimary,
        };
      case 'error':
        return {
          background: theme.colors.error,
          hoverBackground: '#C82333', // Darker red
          color: theme.colors.textInverse,
        };
      case 'info':
        return {
          background: theme.colors.info,
          hoverBackground: '#138496', // Darker teal
          color: theme.colors.textInverse,
        };
      default:
        return {
          background: theme.colors.primary,
          hoverBackground: theme.colors.primaryHover,
          color: theme.colors.textInverse,
        };
    }
  };

  // Get size styles
  const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
      case 'sm':
        return {
          padding: theme.spacing.md + ' ' + theme.spacing.lg,
          fontSize: theme.typography.fontSizes.md,
          minHeight: '44px', // Slightly smaller but still accessible
        };
      case 'md':
        return {
          padding: theme.spacing.lg + ' ' + theme.spacing.xl,
          fontSize: theme.typography.fontSizes.lg,
          minHeight: theme.components.button.minHeight,
        };
      case 'lg':
        return {
          padding: theme.spacing.xl + ' ' + theme.spacing.xxl,
          fontSize: theme.typography.fontSizes.xl,
          minHeight: '56px', // Larger for better accessibility
        };
      case 'xl':
        return {
          padding: theme.spacing.xxl + ' ' + theme.spacing.xxxl,
          fontSize: theme.typography.fontSizes.xxl,
          minHeight: '64px', // Extra large for maximum accessibility
        };
      default:
        return {
          padding: theme.spacing.lg + ' ' + theme.spacing.xl,
          fontSize: theme.typography.fontSizes.lg,
          minHeight: theme.components.button.minHeight,
        };
    }
  };

  const variantColors = getVariantColors(variant);
  const sizeStyles = getSizeStyles(size);

  // Base button styles
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeights.medium,
    fontSize: sizeStyles.fontSize,
    lineHeight: theme.typography.lineHeights.normal,
    padding: sizeStyles.padding,
    minHeight: sizeStyles.minHeight,
    minWidth: theme.components.button.minWidth,
    borderRadius: theme.components.button.borderRadius,
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: theme.transitions.normal,
    backgroundColor: variantColors.background,
    color: variantColors.color,
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    outline: 'none',
    boxShadow: theme.shadows.sm,
    ...style,
  };

  // Hover and focus styles
  const hoverStyles: React.CSSProperties = {
    backgroundColor: variantColors.hoverBackground,
    boxShadow: theme.shadows.md,
    transform: 'translateY(-1px)',
  };

  // Disabled styles
  const disabledStyles: React.CSSProperties = {
    backgroundColor: theme.colors.textMuted,
    color: theme.colors.textInverse,
    boxShadow: 'none',
    transform: 'none',
  };

  // Focus styles for accessibility
  const focusStyles: React.CSSProperties = {
    outline: `3px solid ${theme.colors.borderFocus}`,
    outlineOffset: '2px',
  };

  // Combine styles based on state
  const buttonStyles = {
    ...baseStyles,
    ...(disabled || loading ? disabledStyles : {}),
  };

  // CSS-in-JS hover and focus handling
  const buttonClassName = `
    villages-button
    villages-button--${variant}
    villages-button--${size}
    ${fullWidth ? 'villages-button--full-width' : ''}
    ${loading ? 'villages-button--loading' : ''}
    ${disabled ? 'villages-button--disabled' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClassName}
      style={buttonStyles}
      disabled={disabled || loading}
      {...props}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, buttonStyles);
        }
      }}
      onFocus={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, focusStyles, hoverStyles);
        }
      }}
      onBlur={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, buttonStyles);
        }
      }}
    >
      {loading && (
        <span
          style={{
            width: '20px',
            height: '20px',
            border: `2px solid ${variantColors.color}`,
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: theme.spacing.sm,
          }}
        />
      )}
      {children}
    </button>
  );
};

// Add CSS animation for loading spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Button;