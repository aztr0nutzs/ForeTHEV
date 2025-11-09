import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

// User model
class User {
  final String id;
  final String firstName;
  final String lastName;
  final String email;
  final String phone;
  final String address;
  final DateTime createdAt;
  final bool isActive;

  const User({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phone,
    required this.address,
    required this.createdAt,
    this.isActive = true,
  });

  String get fullName => '$firstName $lastName';

  Map<String, dynamic> toJson() => {
        'id': id,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone,
        'address': address,
        'createdAt': createdAt.toIso8601String(),
        'isActive': isActive,
      };

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json['id'],
        firstName: json['firstName'],
        lastName: json['lastName'],
        email: json['email'],
        phone: json['phone'],
        address: json['address'],
        createdAt: DateTime.parse(json['createdAt']),
        isActive: json['isActive'] ?? true,
      );
}

// Authentication service
class AuthService extends ChangeNotifier {
  static const String _userKey = 'current_user';
  static const String _tokenKey = 'auth_token';

  User? _currentUser;
  String? _token;
  bool _isLoading = false;

  User? get currentUser => _currentUser;
  String? get token => _token;
  bool get isAuthenticated => _currentUser != null && _token != null;
  bool get isLoading => _isLoading;

  // Initialize service - load saved user data
  Future<void> initialize() async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();

      // Load saved user data
      final userJson = prefs.getString(_userKey);
      final savedToken = prefs.getString(_tokenKey);

      if (userJson != null && savedToken != null) {
        _currentUser = User.fromJson(json.decode(userJson));
        _token = savedToken;
      }
    } catch (e) {
      debugPrint('Error initializing auth service: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Sign in with email and password
  Future<bool> signIn(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    try {
      // Simulate API call delay
      await Future.delayed(const Duration(seconds: 2));

      // For demo purposes, accept demo credentials
      if (email == 'demo@villagesconnect.com' && password == 'demo123') {
        // Create demo user
        _currentUser = const User(
          id: 'demo_user_123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'demo@villagesconnect.com',
          phone: '(352) 555-0123',
          address: '123 Palm Drive, The Villages, FL 32162',
          createdAt: null, // Will be set below
        ).copyWith(createdAt: DateTime.now());

        // Generate mock token
        _token = 'demo_token_${DateTime.now().millisecondsSinceEpoch}';

        // Save to persistent storage
        await _saveUserData();

        _isLoading = false;
        notifyListeners();
        return true;
      }

      // For other valid email formats, create a mock user
      if (email.contains('@') && password.length >= 6) {
        final nameParts = email.split('@')[0].split('.');
        final firstName = nameParts.isNotEmpty ? nameParts[0] : 'User';
        final lastName = nameParts.length > 1 ? nameParts[1] : 'Demo';

        _currentUser = User(
          id: 'user_${DateTime.now().millisecondsSinceEpoch}',
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: '(352) 555-0000',
          address: 'The Villages, FL',
          createdAt: DateTime.now(),
        );

        _token = 'token_${DateTime.now().millisecondsSinceEpoch}';
        await _saveUserData();

        _isLoading = false;
        notifyListeners();
        return true;
      }

      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e) {
      debugPrint('Error signing in: $e');
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // Register new user
  Future<bool> register({
    required String firstName,
    required String lastName,
    required String email,
    required String phone,
    required String address,
    required String password,
  }) async {
    _isLoading = true;
    notifyListeners();

    try {
      // Simulate API call delay
      await Future.delayed(const Duration(seconds: 2));

      // Create new user
      _currentUser = User(
        id: 'user_${DateTime.now().millisecondsSinceEpoch}',
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        createdAt: DateTime.now(),
      );

      // Generate token
      _token = 'token_${DateTime.now().millisecondsSinceEpoch}';

      // Save to persistent storage
      await _saveUserData();

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      debugPrint('Error registering user: $e');
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // Update user profile
  Future<bool> updateProfile({
    String? firstName,
    String? lastName,
    String? phone,
    String? address,
  }) async {
    if (_currentUser == null) return false;

    try {
      _currentUser = User(
        id: _currentUser!.id,
        firstName: firstName ?? _currentUser!.firstName,
        lastName: lastName ?? _currentUser!.lastName,
        email: _currentUser!.email,
        phone: phone ?? _currentUser!.phone,
        address: address ?? _currentUser!.address,
        createdAt: _currentUser!.createdAt,
        isActive: _currentUser!.isActive,
      );

      await _saveUserData();
      notifyListeners();
      return true;
    } catch (e) {
      debugPrint('Error updating profile: $e');
      return false;
    }
  }

  // Sign out
  Future<void> signOut() async {
    _currentUser = null;
    _token = null;

    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_userKey);
      await prefs.remove(_tokenKey);
    } catch (e) {
      debugPrint('Error signing out: $e');
    }

    notifyListeners();
  }

  // Save user data to persistent storage
  Future<void> _saveUserData() async {
    if (_currentUser == null || _token == null) return;

    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_userKey, json.encode(_currentUser!.toJson()));
      await prefs.setString(_tokenKey, _token!);
    } catch (e) {
      debugPrint('Error saving user data: $e');
    }
  }

  // Check if user is authenticated (for guards)
  bool get isUserAuthenticated => isAuthenticated;
}

// Extension to copy User with modified fields
extension UserCopyWith on User {
  User copyWith({
    String? id,
    String? firstName,
    String? lastName,
    String? email,
    String? phone,
    String? address,
    DateTime? createdAt,
    bool? isActive,
  }) {
    return User(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      address: address ?? this.address,
      createdAt: createdAt ?? this.createdAt,
      isActive: isActive ?? this.isActive,
    );
  }
}