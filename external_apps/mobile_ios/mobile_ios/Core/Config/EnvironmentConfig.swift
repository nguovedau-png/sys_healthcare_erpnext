//
//  EnvironmentConfig.swift
//  mobile_ios
//
//  Created for DevOps & Operations
//

import Foundation

enum Environment: String {
    case dev = "DEV"
    case staging = "STAGING"
    case prod = "PROD"
}

class EnvironmentConfig {
    static let shared = EnvironmentConfig()
    
    private var currentEnvironment: Environment = .dev
    
    // API URLs for each environment
    private let devAPIURL = "https://dev-api.example.com"
    private let stagingAPIURL = "https://staging-api.example.com"
    private let prodAPIURL = "https://api.example.com"
    
    // WebSocket URLs
    private let devWSURL = "wss://dev-ws.example.com"
    private let stagingWSURL = "wss://staging-ws.example.com"
    private let prodWSURL = "wss://ws.example.com"
    
    private init() {
        // Auto-detect environment from build configuration
        #if DEBUG
        currentEnvironment = .dev
        #else
        currentEnvironment = .prod
        #endif
    }
    
    /// Set current environment
    func setEnvironment(_ environment: Environment) {
        currentEnvironment = environment
    }
    
    /// Get current environment
    func getEnvironment() -> Environment {
        return currentEnvironment
    }
    
    /// Get API base URL for current environment
    func getApiUrl() -> String {
        switch currentEnvironment {
        case .dev:
            return devAPIURL
        case .staging:
            return stagingAPIURL
        case .prod:
            return prodAPIURL
        }
    }
    
    /// Get WebSocket URL for current environment
    func getWebSocketUrl() -> String {
        switch currentEnvironment {
        case .dev:
            return devWSURL
        case .staging:
            return stagingWSURL
        case .prod:
            return prodWSURL
        }
    }
    
    /// Check if current environment is production
    func isProduction() -> Bool {
        return currentEnvironment == .prod
    }
    
    /// Check if current environment is development
    func isDevelopment() -> Bool {
        return currentEnvironment == .dev
    }
    
    /// Check if current environment is staging
    func isStaging() -> Bool {
        return currentEnvironment == .staging
    }
    
    /// Check if debug mode is enabled
    func isDebugMode() -> Bool {
        return !isProduction()
    }
    
    /// Get environment name
    func getEnvironmentName() -> String {
        return currentEnvironment.rawValue
    }
    
    /// Get all configuration as dictionary
    func getConfig() -> [String: String] {
        return [
            "environment": getEnvironmentName(),
            "api_url": getApiUrl(),
            "ws_url": getWebSocketUrl(),
            "debug_mode": "\(isDebugMode())"
        ]
    }
}
