// Emergency Contact Model
class EmergencyContact {
  final String id;
  final String name;
  final String phone;
  final String category; // 'police', 'fire', 'medical', 'utility', 'community', 'custom'
  final String? description;
  final String? address;
  final double? latitude;
  final double? longitude;
  final bool isEmergency; // true for 911-type services
  final bool isPinned; // for custom contacts
  final String? relationship; // for custom contacts (doctor, neighbor, etc.)
  final DateTime? createdAt;
  final DateTime? updatedAt;

  EmergencyContact({
    required this.id,
    required this.name,
    required this.phone,
    required this.category,
    this.description,
    this.address,
    this.latitude,
    this.longitude,
    this.isEmergency = false,
    this.isPinned = false,
    this.relationship,
    this.createdAt,
    this.updatedAt,
  });

  // Factory constructor for JSON deserialization
  factory EmergencyContact.fromJson(Map<String, dynamic> json) {
    return EmergencyContact(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      phone: json['phone'] ?? '',
      category: json['category'] ?? 'custom',
      description: json['description'],
      address: json['address'],
      latitude: json['latitude']?.toDouble(),
      longitude: json['longitude']?.toDouble(),
      isEmergency: json['isEmergency'] ?? false,
      isPinned: json['isPinned'] ?? false,
      relationship: json['relationship'],
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.tryParse(json['updatedAt']) : null,
    );
  }

  // Convert to JSON for storage
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'phone': phone,
      'category': category,
      'description': description,
      'address': address,
      'latitude': latitude,
      'longitude': longitude,
      'isEmergency': isEmergency,
      'isPinned': isPinned,
      'relationship': relationship,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  // Create a copy with updated fields
  EmergencyContact copyWith({
    String? id,
    String? name,
    String? phone,
    String? category,
    String? description,
    String? address,
    double? latitude,
    double? longitude,
    bool? isEmergency,
    bool? isPinned,
    String? relationship,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return EmergencyContact(
      id: id ?? this.id,
      name: name ?? this.name,
      phone: phone ?? this.phone,
      category: category ?? this.category,
      description: description ?? this.description,
      address: address ?? this.address,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      isEmergency: isEmergency ?? this.isEmergency,
      isPinned: isPinned ?? this.isPinned,
      relationship: relationship ?? this.relationship,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  // Get display icon based on category
  String getCategoryIcon() {
    switch (category) {
      case 'police':
        return '🚔';
      case 'fire':
        return '🚒';
      case 'medical':
        return '🏥';
      case 'utility':
        return '⚡';
      case 'community':
        return '🏘️';
      case 'custom':
        return isPinned ? '📌' : '👤';
      default:
        return '📞';
    }
  }

  // Get category display name
  String getCategoryDisplayName() {
    switch (category) {
      case 'police':
        return 'Police';
      case 'fire':
        return 'Fire Department';
      case 'medical':
        return 'Medical';
      case 'utility':
        return 'Utilities';
      case 'community':
        return 'Community';
      case 'custom':
        return 'Personal';
      default:
        return 'Contact';
    }
  }

  // Get priority level for sorting
  int getPriority() {
    if (isEmergency) return 0; // Emergency services first
    switch (category) {
      case 'police':
        return 1;
      case 'fire':
        return 2;
      case 'medical':
        return 3;
      case 'utility':
        return 4;
      case 'community':
        return 5;
      case 'custom':
        return isPinned ? 6 : 7; // Pinned custom contacts before unpinned
      default:
        return 8;
    }
  }

  // Check if contact has location information
  bool get hasLocation => latitude != null && longitude != null;

  // Get formatted phone number for display
  String getFormattedPhone() {
    // Basic US phone number formatting
    final cleanPhone = phone.replaceAll(RegExp(r'[^\d]'), '');
    if (cleanPhone.length == 10) {
      return '(${cleanPhone.substring(0, 3)}) ${cleanPhone.substring(3, 6)}-${cleanPhone.substring(6)}';
    }
    return phone; // Return original if not 10 digits
  }
}