//
//  TokenManager.swift
//  mobile_ios
//
//  Created for Authentication Feature
//

import Foundation

class TokenManager {
    static let shared = TokenManager()
    
    private let defaults = UserDefaults.standard
    private let accessTokenKey = "access_token"
    private let refreshTokenKey = "refresh_token"
    private let tokenExpiryKey = "token_expiry"
    private let userIdKey = "user_id"
    
    private init() {}
    
    func saveTokens(accessToken: String, refreshToken: String, expiresIn: TimeInterval = 3600) {
        let expiryTime = Date().addingTimeInterval(expiresIn)
        defaults.set(accessToken, forKey: accessTokenKey)
        defaults.set(refreshToken, forKey: refreshTokenKey)
        defaults.set(expiryTime, forKey: tokenExpiryKey)
    }
    
    func getAccessToken() -> String? {
        return defaults.string(forKey: accessTokenKey)
    }
    
    func getRefreshToken() -> String? {
        return defaults.string(forKey: refreshTokenKey)
    }
    
    func isTokenExpired() -> Bool {
        guard let expiryTime = defaults.object(forKey: tokenExpiryKey) as? Date else {
            return true
        }
        return Date() >= expiryTime
    }
    
    func hasValidToken() -> Bool {
        guard let token = getAccessToken(), !token.isEmpty else {
            return false
        }
        return !isTokenExpired()
    }
    
    func clearTokens() {
        defaults.removeObject(forKey: accessTokenKey)
        defaults.removeObject(forKey: refreshTokenKey)
        defaults.removeObject(forKey: tokenExpiryKey)
        defaults.removeObject(forKey: userIdKey)
    }
    
    func saveUserId(_ userId: String) {
        defaults.set(userId, forKey: userIdKey)
    }
    
    func getUserId() -> String? {
        return defaults.string(forKey: userIdKey)
    }
    
    func shouldRefreshToken() -> Bool {
        guard let expiryTime = defaults.object(forKey: tokenExpiryKey) as? Date else {
            return false
        }
        let fiveMinutesFromNow = Date().addingTimeInterval(5 * 60)
        return fiveMinutesFromNow >= expiryTime
    }
    
    func getTimeUntilExpiry() -> TimeInterval {
        guard let expiryTime = defaults.object(forKey: tokenExpiryKey) as? Date else {
            return 0
        }
        let timeLeft = expiryTime.timeIntervalSinceNow
        return max(0, timeLeft)
    }
}
