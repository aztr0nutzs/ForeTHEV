import React, { useState } from 'react';
import { theme } from '../themes';
import { Button, Navigation } from '../components';

// Emergency contact interface
interface EmergencyContact {
  id: number;
  category: string;
  title: string;
  phone: string;
  description: string;
  available: string;
  priority: 'high' | 'medium' | 'low';
}

// Emergency screen component
const Emergency: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Emergency contacts data
  const emergencyContacts: EmergencyContact[] = [
    {
      id: 1,
      category: 'medical',
      title: 'Emergency Medical Services',
      phone: '911',
      description: 'For life-threatening emergencies, heart attacks, strokes, severe injuries, or any medical emergency requiring immediate response.',
      available: '24/7',
      priority: 'high',
    },
    {
      id: 2,
      category: 'medical',
      title: 'Urgent Care Center',
      phone: '(352) 555-0100',
      description: 'For non-life-threatening medical issues when your primary care physician is unavailable.',
      available: '8 AM - 8 PM Daily',
      priority: 'medium',
    },
    {
      id: 3,
      category: 'security',
      title: 'Community Security',
      phone: '911',
      description: 'For security concerns, suspicious activity, or to report emergencies within The Villages community.',
      available: '24/7',
      priority: 'high',
    },
    {
      id: 4,
      category: 'security',
      title: 'Gate Security',
      phone: '(352) 555-0200',
      description: 'For gate access issues, lost access cards, or security questions at community entrances.',
      available: '24/7',
      priority: 'medium',
    },
    {
      id: 5,
      category: 'maintenance',
      title: 'Emergency Maintenance',
      phone: '(352) 555-0300',
      description: 'For urgent maintenance issues like burst pipes, electrical problems, or HVAC failures.',
      available: '24/7',
      priority: 'high',
    },
    {
      id: 6,
      category: 'maintenance',
      title: 'Regular Maintenance',
      phone: '(352) 555-0301',
      description: 'For non-urgent maintenance requests, repairs, and general upkeep issues.',
      available: '8 AM - 5 PM Weekdays',
      priority: 'low',
    },
    {
      id: 7,
      category: 'transportation',
      title: 'Medical Transportation',
      phone: '(352) 555-0400',
      description: 'Wheelchair accessible transportation for medical appointments and emergencies.',
      available: '6 AM - 10 PM Daily',
      priority: 'medium',
    },
    {
      id: 8,
      category: 'transportation',
      title: 'General Transportation',
      phone: '(352) 555-0401',
      description: 'Scheduled transportation services within The Villages and to nearby locations.',
      available: '7 AM - 7 PM Daily',
      priority: 'low',
    },
    {
      id: 9,
      category: 'utilities',
      title: 'Utility Emergency',
      phone: '(352) 555-0500',
      description: 'For power outages, gas leaks, water main breaks, or other utility emergencies.',
      available: '24/7',
      priority: 'high',
    },
    {
      id: 10,
      category: 'utilities',
      title: 'Utility Services',
      phone: '(352) 555-0501',
      description: 'For utility billing questions, service requests, and non-emergency utility issues.',
      available: '8 AM - 5 PM Weekdays',
      priority: 'low',
    },
    {
      id: 11,
      category: 'general',
      title: 'Community Center',
      phone: '(352) 555-0600',
      description: 'Main community center for general information, activities, and resident services.',
      available: '7 AM - 9 PM Daily',
      priority: 'medium',
    },
    {
      id: 12,
      category: 'general',
      title: 'Resident Services',
      phone: '(352) 555-0601',
      description: 'General resident services, information, and assistance with community resources.',
      available: '8 AM - 6 PM Weekdays',
      priority: 'medium',
    },
  ];

  // Filter contacts by category
  const filteredContacts = selectedCategory === 'all'
    ? emergencyContacts
    : emergencyContacts.filter(contact => contact.category === selectedCategory);

  // Get unique categories
  const categories = Array.from(new Set(emergencyContacts.map(c => c.category)));

  // Get category display name
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'medical': return 'Medical';
      case 'security': return 'Security';
      case 'maintenance': return 'Maintenance';
      case 'transportation': return 'Transportation';
      case 'utilities': return 'Utilities';
      case 'general': return 'General';
      default: return 'Other';
    }
  };

  // Get priority color and style
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          backgroundColor: theme.colors.error,
          color: theme.colors.textInverse,
        };
      case 'medium':
        return {
          backgroundColor: theme.colors.warning,
          color: theme.colors.textPrimary,
        };
      case 'low':
        return {
          backgroundColor: theme.colors.info,
          color: theme.colors.textInverse,
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          color: theme.colors.textInverse,
        };
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <Navigation />

      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: theme.spacing.xl,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: theme.spacing.xxxl }}>
          <h1
            style={{
              fontSize: theme.typography.fontSizes.xxl,
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.lg,
            }}
          >
            Emergency Contacts
          </h1>
          <p
            style={{
              fontSize: theme.typography.fontSizes.lg,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xl,
            }}
          >
            Important contact information for emergencies and essential services in The Villages.
          </p>

          {/* Emergency Alert */}
          <div
            style={{
              backgroundColor: theme.colors.error,
              color: theme.colors.textInverse,
              padding: theme.spacing.xl,
              borderRadius: theme.borderRadius.lg,
              marginBottom: theme.spacing.xl,
              border: `3px solid ${theme.colors.error}`,
            }}
          >
            <h2
              style={{
                fontSize: theme.typography.fontSizes.xl,
                fontWeight: theme.typography.fontWeights.bold,
                marginBottom: theme.spacing.md,
              }}
            >
              🚨 For Life-Threatening Emergencies: Call 911
            </h2>
            <p
              style={{
                fontSize: theme.typography.fontSizes.lg,
                margin: 0,
                lineHeight: theme.typography.lineHeights.normal,
              }}
            >
              If you are experiencing a medical emergency, severe injury, or any situation where life is in immediate danger, call 911 immediately. Do not use email or other contact methods for true emergencies.
            </p>
          </div>

          {/* Category Filter */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.medium,
                color: theme.colors.textPrimary,
                marginBottom: theme.spacing.sm,
              }}
            >
              Filter by Category:
            </label>
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.md,
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setSelectedCategory('all')}
              >
                All Contacts
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'secondary'}
                  size="md"
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Contacts Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: theme.spacing.xl,
          }}
        >
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              style={{
                backgroundColor: theme.colors.card,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: theme.components.card.borderRadius,
                padding: theme.components.card.padding,
                boxShadow: theme.shadows.sm,
                transition: theme.transitions.normal,
              }}
            >
              {/* Contact Header */}
              <div style={{ marginBottom: theme.spacing.lg }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <h2
                    style={{
                      fontSize: theme.typography.fontSizes.xl,
                      fontWeight: theme.typography.fontWeights.bold,
                      color: theme.colors.textPrimary,
                      margin: 0,
                    }}
                  >
                    {contact.title}
                  </h2>
                  <div
                    style={{
                      ...getPriorityStyle(contact.priority),
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderRadius: theme.borderRadius.sm,
                      fontSize: theme.typography.fontSizes.sm,
                      fontWeight: theme.typography.fontWeights.bold,
                      textTransform: 'uppercase',
                    }}
                  >
                    {contact.priority}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.textInverse,
                    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: theme.typography.fontSizes.sm,
                    fontWeight: theme.typography.fontWeights.medium,
                    display: 'inline-block',
                    marginBottom: theme.spacing.md,
                  }}
                >
                  {getCategoryName(contact.category)}
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ marginBottom: theme.spacing.xl }}>
                <div style={{ marginBottom: theme.spacing.md }}>
                  <strong style={{ color: theme.colors.textPrimary, fontSize: theme.typography.fontSizes.lg }}>
                    Phone: {contact.phone}
                  </strong>
                </div>

                <div style={{ marginBottom: theme.spacing.md }}>
                  <strong style={{ color: theme.colors.textPrimary }}>Available:</strong>
                  <div style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSizes.md }}>
                    {contact.available}
                  </div>
                </div>

                <div>
                  <strong style={{ color: theme.colors.textPrimary }}>Description:</strong>
                  <div
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.typography.fontSizes.md,
                      lineHeight: theme.typography.lineHeights.normal,
                      marginTop: theme.spacing.sm,
                    }}
                  >
                    {contact.description}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ textAlign: 'center' }}>
                <Button
                  variant={contact.priority === 'high' ? 'error' : 'primary'}
                  size="lg"
                  onClick={() => window.open(`tel:${contact.phone}`)}
                  style={{ width: '100%' }}
                >
                  📞 Call {contact.phone}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div
          style={{
            marginTop: theme.spacing.xxxl,
            backgroundColor: theme.colors.surface,
            padding: theme.spacing.xl,
            borderRadius: theme.borderRadius.lg,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <h2
            style={{
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.lg,
            }}
          >
            Additional Emergency Resources
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: theme.spacing.lg,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: theme.typography.fontSizes.lg,
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.textPrimary,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Poison Control
              </h3>
              <p style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.sm }}>
                For poisoning emergencies: 1-800-222-1222
              </p>
              <Button variant="secondary" size="sm">
                Call Now
              </Button>
            </div>

            <div>
              <h3
                style={{
                  fontSize: theme.typography.fontSizes.lg,
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.textPrimary,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Mental Health Crisis
              </h3>
              <p style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.sm }}>
                24/7 mental health support: 988
              </p>
              <Button variant="secondary" size="sm">
                Call Now
              </Button>
            </div>

            <div>
              <h3
                style={{
                  fontSize: theme.typography.fontSizes.lg,
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.textPrimary,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Weather Emergency
              </h3>
              <p style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.sm }}>
                Severe weather alerts and updates
              </p>
              <Button variant="secondary" size="sm">
                Check Weather
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Emergency;