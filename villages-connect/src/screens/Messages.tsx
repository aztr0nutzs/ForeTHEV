import React, { useState } from 'react';
import { theme } from '../themes';
import { Button, Navigation } from '../components';

// Message interface
interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  priority: 'normal' | 'high' | 'urgent';
}

// Messages screen component
const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Sample messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Community Center',
      subject: 'Monthly Newsletter - January 2024',
      content: 'Dear Residents,\n\nWelcome to our monthly newsletter! This month we have exciting updates about upcoming events, new amenities, and community news.\n\nKey Highlights:\n• New fitness classes starting next week\n• Community garden planting day\n• Volunteer opportunities\n• Weather preparedness tips\n\nStay connected and engaged in your community!\n\nBest regards,\nThe Villages Community Team',
      timestamp: '2024-01-15T10:30:00',
      isRead: false,
      priority: 'normal',
    },
    {
      id: 2,
      sender: 'Security Office',
      subject: 'Important: Gate Access Updates',
      content: 'Attention Residents,\n\nWe are updating our gate access system this weekend. Please be aware of the following changes:\n\n• Temporary access cards will be issued Friday afternoon\n• Main gate will be closed Saturday 8 AM - 12 PM\n• Emergency access remains available\n• Call security at extension 911 if you need assistance\n\nWe apologize for any inconvenience and appreciate your patience.\n\nSecurity Team',
      timestamp: '2024-01-14T14:15:00',
      isRead: false,
      priority: 'high',
    },
    {
      id: 3,
      sender: 'Mary Johnson',
      subject: 'Bridge Club Meeting Reminder',
      content: 'Hi everyone,\n\nJust a friendly reminder that our bridge club meets this Thursday at 2 PM in the recreation center. We have a great group and always welcome new players!\n\nLooking forward to seeing you there.\n\nBest,\nMary',
      timestamp: '2024-01-13T16:45:00',
      isRead: true,
      priority: 'normal',
    },
    {
      id: 4,
      sender: 'Maintenance Department',
      subject: 'Scheduled Water Main Work',
      content: 'Dear Resident,\n\nWe will be performing scheduled maintenance on the water main in your area. This work is expected to take 4-6 hours and may result in temporary water service interruptions.\n\nSchedule:\nDate: January 20, 2024\nTime: 9:00 AM - 3:00 PM\nLocation: Sections 12-15\n\nPlease plan accordingly and store water if needed. We apologize for any inconvenience.\n\nMaintenance Team',
      timestamp: '2024-01-12T09:00:00',
      isRead: true,
      priority: 'high',
    },
    {
      id: 5,
      sender: 'Golf Committee',
      subject: 'Tournament Registration Open',
      content: 'Greetings Golf Enthusiasts!\n\nRegistration is now open for our annual Spring Classic Tournament. This year\'s event promises to be our best yet with improved course conditions and exciting prizes.\n\nDetails:\n• Date: March 15-17, 2024\n• Format: Stroke Play\n• Entry Fee: $50 (includes lunch)\n• Registration deadline: February 28\n\nContact the pro shop to register or get more information.\n\nFairways and Greens,\nGolf Committee',
      timestamp: '2024-01-10T11:20:00',
      isRead: true,
      priority: 'normal',
    },
  ]);

  // Filter messages
  const filteredMessages = messages.filter(message => {
    switch (filter) {
      case 'unread':
        return !message.isRead;
      case 'read':
        return message.isRead;
      default:
        return true;
    }
  });

  // Mark message as read
  const markAsRead = (messageId: number) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  // Handle message selection
  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return diffInHours === 0 ? 'Just now' : `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return theme.colors.error;
      case 'high':
        return theme.colors.warning;
      default:
        return theme.colors.primary;
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
            Messages
          </h1>
          <p
            style={{
              fontSize: theme.typography.fontSizes.lg,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xl,
            }}
          >
            Stay connected with community announcements and messages.
          </p>

          {/* Filter Buttons */}
          <div
            style={{
              display: 'flex',
              gap: theme.spacing.md,
              flexWrap: 'wrap',
              marginBottom: theme.spacing.xl,
            }}
          >
            {[
              { value: 'all', label: 'All Messages' },
              { value: 'unread', label: 'Unread' },
              { value: 'read', label: 'Read' },
            ].map(({ value, label }) => (
              <Button
                key={value}
                variant={filter === value ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setFilter(value as 'all' | 'unread' | 'read')}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selectedMessage ? '350px 1fr' : '1fr',
            gap: theme.spacing.xl,
            height: 'calc(100vh - 300px)',
          }}
        >
          {/* Messages List */}
          <div
            style={{
              backgroundColor: theme.colors.card,
              border: `2px solid ${theme.colors.border}`,
              borderRadius: theme.components.card.borderRadius,
              padding: theme.spacing.lg,
              overflowY: 'auto',
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
              Inbox ({filteredMessages.length})
            </h2>

            {filteredMessages.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: theme.spacing.xxxl,
                  color: theme.colors.textMuted,
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: theme.spacing.xl }}>📬</div>
                <p style={{ fontSize: theme.typography.fontSizes.lg }}>
                  {filter === 'unread' ? 'No unread messages' : 'No messages found'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    style={{
                      padding: theme.spacing.lg,
                      border: `2px solid ${
                        selectedMessage?.id === message.id ? theme.colors.primary : theme.colors.border
                      }`,
                      borderRadius: theme.borderRadius.md,
                      backgroundColor: selectedMessage?.id === message.id
                        ? theme.colors.primary + '10'
                        : message.isRead
                          ? theme.colors.card
                          : theme.colors.surface,
                      cursor: 'pointer',
                      transition: theme.transitions.normal,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: message.isRead ? 'normal' : 'bold',
                          color: theme.colors.textPrimary,
                          fontSize: theme.typography.fontSizes.lg,
                          flex: 1,
                        }}
                      >
                        {message.sender}
                      </div>
                      <div
                        style={{
                          fontSize: theme.typography.fontSizes.sm,
                          color: theme.colors.textMuted,
                          marginLeft: theme.spacing.md,
                        }}
                      >
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>

                    <div
                      style={{
                        fontWeight: message.isRead ? 'normal' : 'bold',
                        color: theme.colors.textPrimary,
                        fontSize: theme.typography.fontSizes.md,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      {message.subject}
                    </div>

                    <div
                      style={{
                        color: theme.colors.textSecondary,
                        fontSize: theme.typography.fontSizes.sm,
                        lineHeight: theme.typography.lineHeights.normal,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {message.content.split('\n')[0]}
                    </div>

                    {message.priority !== 'normal' && (
                      <div
                        style={{
                          marginTop: theme.spacing.sm,
                          display: 'inline-block',
                          backgroundColor: getPriorityColor(message.priority),
                          color: theme.colors.textInverse,
                          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                          borderRadius: theme.borderRadius.sm,
                          fontSize: theme.typography.fontSizes.sm,
                          fontWeight: theme.typography.fontWeights.bold,
                        }}
                      >
                        {message.priority.toUpperCase()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail */}
          {selectedMessage && (
            <div
              style={{
                backgroundColor: theme.colors.card,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: theme.components.card.borderRadius,
                padding: theme.spacing.xl,
                overflowY: 'auto',
              }}
            >
              <div style={{ marginBottom: theme.spacing.xl }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: theme.spacing.lg,
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: theme.typography.fontSizes.xl,
                        fontWeight: theme.typography.fontWeights.bold,
                        color: theme.colors.textPrimary,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      {selectedMessage.subject}
                    </h2>
                    <div
                      style={{
                        fontSize: theme.typography.fontSizes.lg,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      From: {selectedMessage.sender}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: theme.typography.fontSizes.sm,
                        color: theme.colors.textMuted,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </div>
                    {selectedMessage.priority !== 'normal' && (
                      <div
                        style={{
                          display: 'inline-block',
                          backgroundColor: getPriorityColor(selectedMessage.priority),
                          color: theme.colors.textInverse,
                          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                          borderRadius: theme.borderRadius.sm,
                          fontSize: theme.typography.fontSizes.sm,
                          fontWeight: theme.typography.fontWeights.bold,
                        }}
                      >
                        {selectedMessage.priority.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: theme.typography.fontSizes.md,
                  color: theme.colors.textPrimary,
                  lineHeight: theme.typography.lineHeights.normal,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedMessage.content}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;