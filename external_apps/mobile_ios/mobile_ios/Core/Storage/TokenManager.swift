import Foundation
import Security

class TokenManager {
    static let shared = TokenManager()
    
    private let accessTokenKey = "access_token"
    private let refreshTokenKey = "refresh_token"
    private let userIdKey = "user_id"
    
    private init() {}
    
    // MARK: - Save Tokens
    func saveAccessToken(_ token: String) {
        save(key: accessTokenKey, value: token)
    }
    
    func saveRefreshToken(_ token: String) {
        save(key: refreshTokenKey, value: token)
    }
    
    func saveUserId(_ userId: String) {
        UserDefaults.standard.set(userId, forKey: userIdKey)
    }
    
    // MARK: - Get Tokens
    func getAccessToken() -> String? {
        return get(key: accessTokenKey)
    }
    
    func getRefreshToken() -> String? {
        return get(key: refreshTokenKey)
    }
    
    func getUserId() -> String? {
        return UserDefaults.standard.string(forKey: userIdKey)
    }
    
    // MARK: - Clear Tokens
    func clearAll() {
        delete(key: accessTokenKey)
        delete(key: refreshTokenKey)
        UserDefaults.standard.removeObject(forKey: userIdKey)
    }
    
    // MARK: - Keychain Operations
    private func save(key: String, value: String) {
        let data = value.data(using: .utf8)!
        
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data
        ]
        
        SecItemDelete(query as CFDictionary)
        SecItemAdd(query as CFDictionary, nil)
    }
    
    private func get(key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true
        ]
        
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        
        guard status == errSecSuccess,
              let data = result as? Data,
              let value = String(data: data, encoding: .utf8) else {
            return nil
        }
        
        return value
    }
    
    private func delete(key: String) {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key
        ]
        
        SecItemDelete(query as CFDictionary)
    }
}
