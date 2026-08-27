//
//  RemoteConfigManager.swift
//  mobile_ios
//
//  Created for DevOps & Operations
//

import Foundation
import Combine

class RemoteConfigManager: ObservableObject {
    static let shared = RemoteConfigManager()
    
    @Published var config: [String: Any] = [:]
    
    // Default config values
    private let defaultAPITimeout: Int64 = 30000
    private let defaultMaxRetries: Int = 3
    private let defaultCacheTTL: Int64 = 3600
    
    private init() {
        config = getDefaultConfig()
    }
    
    /// Get default configuration
    private func getDefaultConfig() -> [String: Any] {
        return [
            "api_timeout": defaultAPITimeout,
            "max_retries": defaultMaxRetries,
            "cache_ttl": defaultCacheTTL,
            "enable_analytics": true,
            "enable_crash_reporting": true,
            "min_app_version": "1.0.0",
            "force_update_version": "1.0.0",
            "maintenance_mode": false,
            "maintenance_message": "App is under maintenance"
        ]
    }
    
    /// Fetch remote config from server
    func fetchConfig() async {
        // TODO: Fetch from Firebase Remote Config
        // let remoteConfig = RemoteConfig.remoteConfig()
        // try await remoteConfig.fetchAndActivate()
        
        // For now, use default config
        config = getDefaultConfig()
    }
    
    /// Get string value
    func getString(_ key: String, defaultValue: String = "") -> String {
        return config[key] as? String ?? defaultValue
    }
    
    /// Get boolean value
    func getBoolean(_ key: String, defaultValue: Bool = false) -> Bool {
        return config[key] as? Bool ?? defaultValue
    }
    
    /// Get integer value
    func getInt(_ key: String, defaultValue: Int = 0) -> Int {
        if let value = config[key] as? Int {
            return value
        } else if let value = config[key] as? Int64 {
            return Int(value)
        }
        return defaultValue
    }
    
    /// Get double value
    func getDouble(_ key: String, defaultValue: Double = 0.0) -> Double {
        if let value = config[key] as? Double {
            return value
        } else if let value = config[key] as? Float {
            return Double(value)
        }
        return defaultValue
    }
    
    /// Get all config values
    func getAllConfig() -> [String: Any] {
        return config
    }
    
    /// Check if maintenance mode is enabled
    func isMaintenanceMode() -> Bool {
        return getBoolean("maintenance_mode", defaultValue: false)
    }
    
    /// Get maintenance message
    func getMaintenanceMessage() -> String {
        return getString("maintenance_message", defaultValue: "App is under maintenance")
    }
    
    /// Get API timeout
    func getApiTimeout() -> Int {
        return getInt("api_timeout", defaultValue: Int(defaultAPITimeout))
    }
    
    /// Get max retries
    func getMaxRetries() -> Int {
        return getInt("max_retries", defaultValue: defaultMaxRetries)
    }
}
