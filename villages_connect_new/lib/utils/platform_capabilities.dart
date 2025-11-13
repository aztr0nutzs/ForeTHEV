import 'package:flutter/foundation.dart';

/// Provides helpers for feature availability that depends on the current
/// runtime platform. Centralizing these checks keeps platform-specific
/// conditions consistent across the app.
class PlatformCapabilities {
  const PlatformCapabilities._();

  /// Returns true when FlutterFire (firebase_core/firebase_auth) is fully
  /// supported on the current platform.
  static bool get supportsFirebase {
    if (kIsWeb) return true;

    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
      case TargetPlatform.iOS:
      case TargetPlatform.macOS:
      case TargetPlatform.windows:
        return true;
      default:
        // Linux and Fuchsia builds currently lack first-party FlutterFire
        // support, so we fall back to guest/local-only flows.
        return false;
    }
  }

  /// Returns true when flutter_tts has a native implementation.
  static bool get supportsTextToSpeech {
    if (kIsWeb) return false;

    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
      case TargetPlatform.iOS:
      case TargetPlatform.macOS:
        return true;
      default:
        // Linux and Windows lack flutter_tts implementations today.
        return false;
    }
  }
}
