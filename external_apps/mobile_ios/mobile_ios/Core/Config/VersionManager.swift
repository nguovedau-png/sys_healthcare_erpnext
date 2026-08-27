//
//  VersionManager.swift
//  mobile_ios
//
//  Created for DevOps & Operations
//

import Foundation

struct AppVersion {
    let versionName: String
    let versionCode: Int
}

struct VersionCheckResult {
    let currentVersion: AppVersion
    let latestVersion: AppVersion
    let isUpdateAvailable: Bool
    let isForceUpdate: Bool
    let updateMessage: String?
    let downloadUrl: String?
}

class VersionManager {
    static let shared = VersionManager()
    
    private init() {}
    
    /// Get current app version
    func getCurrentVersion() -> AppVersion {
        let versionName = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
        let versionCode = Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "1"
        
        return AppVersion(
            versionName: versionName,
            versionCode: Int(versionCode) ?? 1
        )
    }
    
    /// Check for app updates from server
    func checkForUpdate() async -> VersionCheckResult {
        let currentVersion = getCurrentVersion()
        
        // TODO: Fetch latest version from server
        // let response = try await apiService.getLatestVersion()
        
        // Mock response for now
        let latestVersion = AppVersion(versionName: "1.2.0", versionCode: 12)
        let minRequiredVersion = AppVersion(versionName: "1.1.0", versionCode: 11)
        
        let isUpdateAvailable = latestVersion.versionCode > currentVersion.versionCode
        let isForceUpdate = currentVersion.versionCode < minRequiredVersion.versionCode
        
        return VersionCheckResult(
            currentVersion: currentVersion,
            latestVersion: latestVersion,
            isUpdateAvailable: isUpdateAvailable,
            isForceUpdate: isForceUpdate,
            updateMessage: isForceUpdate
                ? "A critical update is required to continue using the app"
                : isUpdateAvailable
                    ? "A new version is available with bug fixes and improvements"
                    : nil,
            downloadUrl: "https://apps.apple.com/app/id123456789" // TODO: Replace with actual App Store URL
        )
    }
    
    /// Compare two versions
    func compareVersions(_ v1: AppVersion, _ v2: AppVersion) -> ComparisonResult {
        if v1.versionCode < v2.versionCode {
            return .orderedAscending
        } else if v1.versionCode > v2.versionCode {
            return .orderedDescending
        } else {
            return .orderedSame
        }
    }
    
    /// Check if version is outdated
    func isOutdated(current: AppVersion, latest: AppVersion) -> Bool {
        return current.versionCode < latest.versionCode
    }
    
    /// Get version string for display
    func getVersionString() -> String {
        let version = getCurrentVersion()
        return "\(version.versionName) (\(version.versionCode))"
    }
}
