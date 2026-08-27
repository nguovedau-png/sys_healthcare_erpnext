//
//  CrashReporter.swift
//  mobile_ios
//
//  Created for Analytics & Monitoring
//

import Foundation

class CrashReporter {
    static let shared = CrashReporter()
    
    private init() {}
    
    /// Log non-fatal exception
    func logException(_ error: Error, message: String? = nil) {
        // TODO: Send to Crashlytics
        // Crashlytics.crashlytics().record(error: error)
        
        print("CrashReporter: \(message ?? "Exception occurred") - \(error.localizedDescription)")
    }
    
    /// Log custom message
    func log(_ message: String) {
        // TODO: Add to Crashlytics log
        // Crashlytics.crashlytics().log(message)
        
        print("CrashReporter: \(message)")
    }
    
    /// Set custom key
    func setCustomKey(_ key: String, value: String) {
        // TODO: Set Crashlytics custom key
        // Crashlytics.crashlytics().setCustomValue(value, forKey: key)
        
        print("Custom Key: \(key) = \(value)")
    }
    
    /// Set user identifier
    func setUserId(_ userId: String) {
        // TODO: Set Crashlytics user ID
        // Crashlytics.crashlytics().setUserID(userId)
        
        print("User ID: \(userId)")
    }
    
    /// Force crash (for testing)
    func forceCrash() {
        fatalError("Test crash")
    }
    
    /// Check if crash reporting is enabled
    func isCrashReportingEnabled() -> Bool {
        // TODO: Check Crashlytics status
        // return Crashlytics.crashlytics().isCrashlyticsCollectionEnabled()
        return true
    }
    
    /// Enable/disable crash reporting
    func setCrashReportingEnabled(_ enabled: Bool) {
        // TODO: Set Crashlytics collection
        // Crashlytics.crashlytics().setCrashlyticsCollectionEnabled(enabled)
        
        print("Crash reporting: \(enabled)")
    }
}
