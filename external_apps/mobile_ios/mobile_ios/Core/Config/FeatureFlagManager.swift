//
//  FeatureFlagManager.swift
//  mobile_ios
//
//  Created for DevOps & Operations
//

import Foundation
import Combine

class FeatureFlagManager: ObservableObject {
    static let shared = FeatureFlagManager()
    
    @Published var flags: [String: Bool] = [:]
    
    private let defaults = UserDefaults.standard
    private let flagsKey = "feature_flags"
    
    private init() {
        loadFlags()
    }
    
    /// Check if feature is enabled
    func isEnabled(_ featureName: String, defaultValue: Bool = false) -> Bool {
        return flags[featureName] ?? defaultValue
    }
    
    /// Enable feature
    func enable(_ featureName: String) {
        setFlag(featureName, enabled: true)
    }
    
    /// Disable feature
    func disable(_ featureName: String) {
        setFlag(featureName, enabled: false)
    }
    
    /// Set feature flag value
    func setFlag(_ featureName: String, enabled: Bool) {
        flags[featureName] = enabled
        saveFlags()
    }
    
    /// Set multiple flags at once
    func setFlags(_ newFlags: [String: Bool]) {
        flags.merge(newFlags) { _, new in new }
        saveFlags()
    }
    
    /// Load flags from UserDefaults
    private func loadFlags() {
        if let savedFlags = defaults.dictionary(forKey: flagsKey) as? [String: Bool] {
            flags = savedFlags
        }
    }
    
    /// Save flags to UserDefaults
    private func saveFlags() {
        defaults.set(flags, forKey: flagsKey)
    }
    
    /// Get all flags
    func getAllFlags() -> [String: Bool] {
        return flags
    }
    
    /// Clear all flags
    func clearAll() {
        flags.removeAll()
        defaults.removeObject(forKey: flagsKey)
    }
    
    /// Common feature flags
    enum Features {
        static let newUI = "new_ui"
        static let darkMode = "dark_mode"
        static let analytics = "analytics"
        static let pushNotifications = "push_notifications"
        static let socialLogin = "social_login"
        static let inAppPurchase = "in_app_purchase"
        static let betaFeatures = "beta_features"
        static let debugMenu = "debug_menu"
    }
}
