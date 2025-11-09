import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:dio/dio.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'storage_service.dart';

// API Configuration
class ApiConfig {
  static const String baseUrl = 'https://api.thevillages.com'; // Placeholder - replace with actual API
  static const String newsEndpoint = '/api/news';
  static const String eventsEndpoint = '/api/events';
  static const Duration timeout = Duration(seconds: 30);
  static const int maxRetries = 3;
}

// News Article Model
class NewsArticle {
  final String id;
  final String title;
  final String summary;
  final String content;
  final String author;
  final String category;
  final String imageUrl;
  final DateTime publishedAt;
  final String source;
  final String url;

  NewsArticle({
    required this.id,
    required this.title,
    required this.summary,
    required this.content,
    required this.author,
    required this.category,
    required this.imageUrl,
    required this.publishedAt,
    required this.source,
    required this.url,
  });

  factory NewsArticle.fromJson(Map<String, dynamic> json) => NewsArticle(
        id: json['id']?.toString() ?? '',
        title: json['title'] ?? 'Untitled',
        summary: json['summary'] ?? json['description'] ?? '',
        content: json['content'] ?? json['body'] ?? '',
        author: json['author'] ?? 'The Villages Daily Sun',
        category: json['category'] ?? 'General',
        imageUrl: json['imageUrl'] ?? json['image'] ?? '',
        publishedAt: DateTime.tryParse(json['publishedAt'] ?? json['date'] ?? '') ?? DateTime.now(),
        source: json['source'] ?? 'The Villages Daily Sun',
        url: json['url'] ?? json['link'] ?? '',
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'summary': summary,
        'content': content,
        'author': author,
        'category': category,
        'imageUrl': imageUrl,
        'publishedAt': publishedAt.toIso8601String(),
        'source': source,
        'url': url,
      };
}

// API Event Model (different from cached event)
class ApiEvent {
  final String id;
  final String title;
  final String description;
  final String category;
  final DateTime startDate;
  final DateTime endDate;
  final String location;
  final String organizer;
  final int maxAttendees;
  final int currentAttendees;
  final String status; // 'upcoming', 'ongoing', 'completed', 'cancelled'
  final String imageUrl;
  final String registrationUrl;
  final List<String> tags;

  ApiEvent({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.startDate,
    required this.endDate,
    required this.location,
    required this.organizer,
    required this.maxAttendees,
    required this.currentAttendees,
    required this.status,
    required this.imageUrl,
    required this.registrationUrl,
    required this.tags,
  });

  factory ApiEvent.fromJson(Map<String, dynamic> json) => ApiEvent(
        id: json['id']?.toString() ?? '',
        title: json['title'] ?? 'Untitled Event',
        description: json['description'] ?? '',
        category: json['category'] ?? 'General',
        startDate: DateTime.tryParse(json['startDate'] ?? json['start_date'] ?? '') ?? DateTime.now(),
        endDate: DateTime.tryParse(json['endDate'] ?? json['end_date'] ?? '') ?? DateTime.now(),
        location: json['location'] ?? 'TBD',
        organizer: json['organizer'] ?? 'The Villages',
        maxAttendees: json['maxAttendees'] ?? json['capacity'] ?? 0,
        currentAttendees: json['currentAttendees'] ?? json['registered'] ?? 0,
        status: json['status'] ?? 'upcoming',
        imageUrl: json['imageUrl'] ?? json['image'] ?? '',
        registrationUrl: json['registrationUrl'] ?? json['register_url'] ?? '',
        tags: List<String>.from(json['tags'] ?? []),
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'description': description,
        'category': category,
        'startDate': startDate.toIso8601String(),
        'endDate': endDate.toIso8601String(),
        'location': location,
        'organizer': organizer,
        'maxAttendees': maxAttendees,
        'currentAttendees': currentAttendees,
        'status': status,
        'imageUrl': imageUrl,
        'registrationUrl': registrationUrl,
        'tags': tags,
      };
}

// API Response wrapper
class ApiResponse<T> {
  final bool success;
  final T? data;
  final String? error;
  final int? statusCode;

  ApiResponse({
    required this.success,
    this.data,
    this.error,
    this.statusCode,
  });

  factory ApiResponse.success(T data) => ApiResponse(success: true, data: data);

  factory ApiResponse.error(String error, {int? statusCode}) =>
      ApiResponse(success: false, error: error, statusCode: statusCode);
}

// API Service
class ApiService extends ChangeNotifier {
  late Dio _dio;
  late Connectivity _connectivity;
  final StorageService _storageService;

  bool _isOnline = true;
  DateTime? _lastNewsFetch;
  DateTime? _lastEventsFetch;

  static const Duration _cacheExpiry = Duration(hours: 6); // 6 hours for API data

  ApiService(this._storageService) {
    _initializeService();
  }

  void _initializeService() {
    // Initialize Dio
    _dio = Dio(BaseOptions(
      baseUrl: ApiConfig.baseUrl,
      connectTimeout: ApiConfig.timeout,
      receiveTimeout: ApiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    // Add interceptors
    _dio.interceptors.addAll([
      LogInterceptor(
        request: kDebugMode,
        requestHeader: kDebugMode,
        requestBody: kDebugMode,
        responseHeader: kDebugMode,
        responseBody: kDebugMode,
        error: true,
      ),
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // Add any auth headers here if needed
          return handler.next(options);
        },
        onError: (error, handler) async {
          if (error.type == DioExceptionType.connectionTimeout ||
              error.type == DioExceptionType.receiveTimeout) {
            // Retry logic for timeout errors
            final retryCount = error.requestOptions.extra['retry'] ?? 0;
            if (retryCount < ApiConfig.maxRetries) {
              error.requestOptions.extra['retry'] = retryCount + 1;
              await Future.delayed(Duration(seconds: 1));
              return handler.resolve(await _dio.fetch(error.requestOptions));
            }
          }
          return handler.next(error);
        },
      ),
    ]);

    // Initialize connectivity
    _connectivity = Connectivity();
    _connectivity.onConnectivityChanged.listen(_onConnectivityChanged);

    // Check initial connectivity
    _checkConnectivity();
  }

  void _onConnectivityChanged(ConnectivityResult result) {
    final wasOnline = _isOnline;
    _isOnline = result != ConnectivityResult.none;

    if (wasOnline != _isOnline) {
      notifyListeners();
      debugPrint('Connectivity changed: ${_isOnline ? 'Online' : 'Offline'}');
    }
  }

  Future<void> _checkConnectivity() async {
    try {
      final result = await _connectivity.checkConnectivity();
      _isOnline = result != ConnectivityResult.none;
    } catch (e) {
      _isOnline = false;
      debugPrint('Error checking connectivity: $e');
    }
  }

  bool get isOnline => _isOnline;

  // News API Methods
  Future<ApiResponse<List<NewsArticle>>> fetchNews({
    int limit = 20,
    String category = 'all',
    bool forceRefresh = false,
  }) async {
    try {
      // Check cache first unless force refresh
      if (!forceRefresh && _shouldUseCache(_lastNewsFetch)) {
        final cachedNews = await _getCachedNews();
        if (cachedNews.isNotEmpty) {
          return ApiResponse.success(cachedNews);
        }
      }

      if (!_isOnline) {
        // Return cached data if offline
        final cachedNews = await _getCachedNews();
        return cachedNews.isNotEmpty
            ? ApiResponse.success(cachedNews)
            : ApiResponse.error('No internet connection and no cached data available');
      }

      // Make API call
      final response = await _dio.get(
        ApiConfig.newsEndpoint,
        queryParameters: {
          'limit': limit,
          'category': category,
        },
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = response.data['articles'] ?? response.data ?? [];
        final articles = data.map((json) => NewsArticle.fromJson(json)).toList();

        // Cache the results
        await _cacheNews(articles);
        _lastNewsFetch = DateTime.now();

        return ApiResponse.success(articles);
      } else {
        return ApiResponse.error('Failed to fetch news: ${response.statusCode}');
      }
    } catch (e) {
      debugPrint('Error fetching news: $e');

      // Try to return cached data on error
      final cachedNews = await _getCachedNews();
      if (cachedNews.isNotEmpty) {
        return ApiResponse.success(cachedNews);
      }

      return ApiResponse.error('Failed to fetch news: ${e.toString()}');
    }
  }

  // Events API Methods
  Future<ApiResponse<List<ApiEvent>>> fetchEvents({
    int limit = 20,
    String category = 'all',
    bool forceRefresh = false,
  }) async {
    try {
      // Check cache first unless force refresh
      if (!forceRefresh && _shouldUseCache(_lastEventsFetch)) {
        final cachedEvents = await _getCachedEvents();
        if (cachedEvents.isNotEmpty) {
          return ApiResponse.success(cachedEvents);
        }
      }

      if (!_isOnline) {
        // Return cached data if offline
        final cachedEvents = await _getCachedEvents();
        return cachedEvents.isNotEmpty
            ? ApiResponse.success(cachedEvents)
            : ApiResponse.error('No internet connection and no cached data available');
      }

      // Make API call
      final response = await _dio.get(
        ApiConfig.eventsEndpoint,
        queryParameters: {
          'limit': limit,
          'category': category,
        },
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = response.data['events'] ?? response.data ?? [];
        final events = data.map((json) => ApiEvent.fromJson(json)).toList();

        // Cache the results
        await _cacheEvents(events);
        _lastEventsFetch = DateTime.now();

        return ApiResponse.success(events);
      } else {
        return ApiResponse.error('Failed to fetch events: ${response.statusCode}');
      }
    } catch (e) {
      debugPrint('Error fetching events: $e');

      // Try to return cached data on error
      final cachedEvents = await _getCachedEvents();
      if (cachedEvents.isNotEmpty) {
        return ApiResponse.success(cachedEvents);
      }

      return ApiResponse.error('Failed to fetch events: ${e.toString()}');
    }
  }

  // Cache Management
  bool _shouldUseCache(DateTime? lastFetch) {
    if (lastFetch == null) return false;
    return DateTime.now().difference(lastFetch) < _cacheExpiry;
  }

  Future<void> _cacheNews(List<NewsArticle> articles) async {
    final cacheData = {
      'articles': articles.map((a) => a.toJson()).toList(),
      'cachedAt': DateTime.now().toIso8601String(),
    };
    await _storageService.saveAppState({'news_cache': cacheData});
  }

  Future<List<NewsArticle>> _getCachedNews() async {
    try {
      final cache = await _storageService.getAppState();
      final newsCache = cache['news_cache'];
      if (newsCache == null) return [];

      final cachedAt = DateTime.tryParse(newsCache['cachedAt'] ?? '');
      if (cachedAt == null || DateTime.now().difference(cachedAt) > _cacheExpiry) {
        return [];
      }

      final articles = (newsCache['articles'] as List<dynamic>?)
          ?.map((json) => NewsArticle.fromJson(json))
          .toList() ?? [];

      return articles;
    } catch (e) {
      debugPrint('Error getting cached news: $e');
      return [];
    }
  }

  Future<void> _cacheEvents(List<ApiEvent> events) async {
    final cacheData = {
      'events': events.map((e) => e.toJson()).toList(),
      'cachedAt': DateTime.now().toIso8601String(),
    };
    await _storageService.saveAppState({'events_cache': cacheData});
  }

  Future<List<ApiEvent>> _getCachedEvents() async {
    try {
      final cache = await _storageService.getAppState();
      final eventsCache = cache['events_cache'];
      if (eventsCache == null) return [];

      final cachedAt = DateTime.tryParse(eventsCache['cachedAt'] ?? '');
      if (cachedAt == null || DateTime.now().difference(cachedAt) > _cacheExpiry) {
        return [];
      }

      final events = (eventsCache['events'] as List<dynamic>?)
          ?.map((json) => ApiEvent.fromJson(json))
          .toList() ?? [];

      return events;
    } catch (e) {
      debugPrint('Error getting cached events: $e');
      return [];
    }
  }

  // Utility Methods
  Future<void> refreshAllData() async {
    if (!_isOnline) return;

    await Future.wait([
      fetchNews(forceRefresh: true),
      fetchEvents(forceRefresh: true),
    ]);
  }

  Future<void> clearCache() async {
    await _storageService.saveAppState({
      'news_cache': null,
      'events_cache': null,
    });
    _lastNewsFetch = null;
    _lastEventsFetch = null;
  }

  // Get cache statistics
  Future<Map<String, dynamic>> getCacheStats() async {
    final newsCache = await _getCachedNews();
    final eventsCache = await _getCachedEvents();

    return {
      'isOnline': _isOnline,
      'newsCacheCount': newsCache.length,
      'eventsCacheCount': eventsCache.length,
      'lastNewsFetch': _lastNewsFetch?.toIso8601String(),
      'lastEventsFetch': _lastEventsFetch?.toIso8601String(),
    };
  }
}