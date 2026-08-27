import SwiftUI
import Combine

@MainActor
class LoginViewModel: ObservableObject {
    @Published var email = "admin@example.com"
    @Published var password = "admin@123"
    @Published var isLoading = false
    @Published var errorMessage: String?
    // @Published var isLoggedIn = false (removed, handled by AuthManager)
    @Published var requires2FA = false
    
    private let apiService = APIService.shared
    
    func login() async {
        isLoading = true
        errorMessage = nil
        
        do {
            let response = try await apiService.login(email: email, password: password)
            
            if response.requires2FA == true {
                requires2FA = true
            } else {
                // Update global auth state
                AuthManager.shared.login(response: response)
            }
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
}
