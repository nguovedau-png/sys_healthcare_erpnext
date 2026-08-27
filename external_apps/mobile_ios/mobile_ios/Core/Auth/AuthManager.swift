import SwiftUI
import Combine

@MainActor
class AuthManager: ObservableObject {
    static let shared = AuthManager()
    
    @Published var isAuthenticated: Bool = false
    @Published var isLoading: Bool = true
    
    private init() {
        checkSession()
    }
    
    func checkSession() {
        if TokenManager.shared.getAccessToken() != nil {
            isAuthenticated = true
        } else {
            isAuthenticated = false
        }
        isLoading = false
    }
    
    func login(response: LoginResponse) {
        // Save tokens
        TokenManager.shared.saveAccessToken(response.accessToken)
        TokenManager.shared.saveRefreshToken(response.refreshToken)
        TokenManager.shared.saveUserId(response.user.id)
        
        isAuthenticated = true
    }
    
    func logout() {
        TokenManager.shared.clearAll()
        isAuthenticated = false
    }
}
