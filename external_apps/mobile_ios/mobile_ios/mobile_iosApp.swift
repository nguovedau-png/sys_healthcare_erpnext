import SwiftUI

@main
struct mobile_iosApp: App {
    @StateObject private var authManager = AuthManager.shared
    
    var body: some Scene {
        WindowGroup {
            if authManager.isLoading {
                ProgressView()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color.white)
            } else if authManager.isAuthenticated {
                MainTabView()
            } else {
                LoginView()
            }
        }
    }
}
