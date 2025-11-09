import React, { useState } from 'react';
import { theme } from '../themes';
import { Button, Navigation } from '../components';

// Resident interface
interface Resident {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  interests: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// Directory screen component
const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample resident data
  const [residents] = useState<Resident[]>([
    {
      id: 1,
      name: 'John Smith',
      phone: '(352) 555-0123',
      email: 'john.smith@email.com',
      address: '123 Palm Drive, The Villages, FL 32162',
      interests: ['Golf', 'Bridge', 'Book Club'],
      emergencyContact: {
        name: 'Jane Smith',
        phone: '(352) 555-0124',
        relationship: 'Spouse',
      },
    },
    {
      id: 2,
      name: 'Mary Johnson',
      phone: '(352) 555-0125',
      email: 'mary.johnson@email.com',
      address: '456 Oak Street, The Villages, FL 32163',
      interests: ['Tennis', 'Painting', 'Volunteer Work'],
    },
    {
      id: 3,
      name: 'Robert Davis',
      phone: '(352) 555-0126',
      email: 'robert.davis@email.com',
      address: '789 Pine Avenue, The Villages, FL 32159',
      interests: ['Bowling', 'Photography', 'Gardening'],
      emergencyContact: {
        name: 'Susan Davis',
        phone: '(352) 555-0127',
        relationship: 'Daughter',
      },
    },
    {
      id: 4,
      name: 'Patricia Wilson',
      phone: '(352) 555-0128',
      email: 'patricia.wilson@email.com',
      address: '321 Maple Lane, The Villages, FL 32162',
      interests: ['Swimming', 'Cooking', 'Knitting'],
    },
    {
      id: 5,
      name: 'Michael Brown',
      phone: '(352) 555-0129',
      email: 'michael.brown@email.com',
      address: '654 Cedar Court, The Villages, FL 32163',
      interests: ['Fishing', 'Woodworking', 'Chess'],
      emergencyContact: {
        name: 'Lisa Brown',
        phone: '(352) 555-0130',
        relationship: 'Wife',
      },
    },
  ]);

  // Filter residents based on search and category
  const filteredResidents = residents.filter(resident => {
    const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.interests.some(interest =>
                           interest.toLowerCase().includes(searchTerm.toLowerCase())
                         );

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'emergency') return matchesSearch && resident.emergencyContact;
    return matchesSearch && resident.interests.some(interest =>
      interest.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  // Get unique interests for category filter
  const allInterests = Array.from(new Set(residents.flatMap(r => r.interests))).sort();

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
            Resident Directory
          </h1>
          <p
            style={{
              fontSize: theme.typography.fontSizes.lg,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xl,
            }}
          >
            Connect with fellow residents in The Villages community.
          </p>

          {/* Search and Filter */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.lg,
              marginBottom: theme.spacing.xl,
            }}
          >
            {/* Search Input */}
            <div>
              <label
                htmlFor="search"
                style={{
                  display: 'block',
                  fontSize: theme.typography.fontSizes.lg,
                  fontWeight: theme.typography.fontWeights.medium,
                  color: theme.colors.textPrimary,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Search Residents:
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by name or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: theme.spacing.lg,
                  fontSize: theme.typography.fontSizes.lg,
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: theme.colors.card,
                  color: theme.colors.textPrimary,
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.primary;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.colors.border;
                }}
              />
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
                Filter by Interest:
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
                  All Residents
                </Button>
                <Button
                  variant={selectedCategory === 'emergency' ? 'warning' : 'secondary'}
                  size="md"
                  onClick={() => setSelectedCategory('emergency')}
                >
                  Emergency Contacts Only
                </Button>
                {allInterests.slice(0, 6).map((interest) => (
                  <Button
                    key={interest}
                    variant={selectedCategory === interest.toLowerCase() ? 'primary' : 'secondary'}
                    size="md"
                    onClick={() => setSelectedCategory(interest.toLowerCase())}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <p
            style={{
              fontSize: theme.typography.fontSizes.lg,
              color: theme.colors.textSecondary,
            }}
          >
            Showing {filteredResidents.length} of {residents.length} residents
          </p>
        </div>

        {/* Residents Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: theme.spacing.xl,
          }}
        >
          {filteredResidents.map((resident) => (
            <div
              key={resident.id}
              style={{
                backgroundColor: theme.colors.card,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: theme.components.card.borderRadius,
                padding: theme.components.card.padding,
                boxShadow: theme.shadows.sm,
                transition: theme.transitions.normal,
              }}
            >
              {/* Resident Header */}
              <div style={{ marginBottom: theme.spacing.lg }}>
                <h2
                  style={{
                    fontSize: theme.typography.fontSizes.xl,
                    fontWeight: theme.typography.fontWeights.bold,
                    color: theme.colors.textPrimary,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {resident.name}
                </h2>

                {/* Interests */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: theme.spacing.sm,
                    marginBottom: theme.spacing.md,
                  }}
                >
                  {resident.interests.map((interest, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.textInverse,
                        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                        borderRadius: theme.borderRadius.sm,
                        fontSize: theme.typography.fontSizes.sm,
                        fontWeight: theme.typography.fontWeights.medium,
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ marginBottom: theme.spacing.lg }}>
                <div style={{ marginBottom: theme.spacing.md }}>
                  <strong style={{ color: theme.colors.textPrimary }}>Phone:</strong>
                  <div style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSizes.lg }}>
                    {resident.phone}
                  </div>
                </div>

                <div style={{ marginBottom: theme.spacing.md }}>
                  <strong style={{ color: theme.colors.textPrimary }}>Email:</strong>
                  <div style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSizes.md }}>
                    {resident.email}
                  </div>
                </div>

                <div>
                  <strong style={{ color: theme.colors.textPrimary }}>Address:</strong>
                  <div style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSizes.md }}>
                    {resident.address}
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {resident.emergencyContact && (
                <div
                  style={{
                    backgroundColor: theme.colors.warning + '20',
                    border: `1px solid ${theme.colors.warning}`,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.lg,
                    marginBottom: theme.spacing.lg,
                  }}
                >
                  <h3
                    style={{
                      fontSize: theme.typography.fontSizes.lg,
                      fontWeight: theme.typography.fontWeights.bold,
                      color: theme.colors.textPrimary,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    Emergency Contact
                  </h3>
                  <div style={{ marginBottom: theme.spacing.sm }}>
                    <strong style={{ color: theme.colors.textPrimary }}>{resident.emergencyContact.name}</strong>
                    <span style={{ color: theme.colors.textMuted, marginLeft: theme.spacing.sm }}>
                      ({resident.emergencyContact.relationship})
                    </span>
                  </div>
                  <div style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSizes.lg }}>
                    {resident.emergencyContact.phone}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing.md,
                  flexWrap: 'wrap',
                }}
              >
                <Button variant="primary" size="md" style={{ flex: 1 }}>
                  📞 Call
                </Button>
                <Button variant="secondary" size="md" style={{ flex: 1 }}>
                  ✉️ Email
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResidents.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: theme.spacing.xxxl,
              color: theme.colors.textMuted,
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: theme.spacing.xl }}>📖</div>
            <h3
              style={{
                fontSize: theme.typography.fontSizes.xl,
                marginBottom: theme.spacing.lg,
              }}
            >
              No residents found
            </h3>
            <p style={{ fontSize: theme.typography.fontSizes.lg }}>
              Try adjusting your search terms or filter criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Directory;