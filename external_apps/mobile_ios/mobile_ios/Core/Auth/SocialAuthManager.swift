//
//  SocialAuthManager.swift
//  mobile_ios
//
//  Created for Authentication System
//

import Foundation
import Combine
import AuthenticationServices

enum SocialProvider {
    case google
    case facebook
    case apple
}

enum SocialAuthResult {
    case success(token: String, provider: SocialProvider, email: String?)
    case error(String)
    case cancelled
    case inProgress
}

class SocialAuthManager: NSObject, ObservableObject {
    static let shared = SocialAuthManager()
    
    @Published var authResult: SocialAuthResult?
    
    private override init() {
        super.init()
    }
    
    // MARK: - Apple Sign In
    
    func signInWithApple() {
        self.authResult = .inProgress
        
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        let request = appleIDProvider.createRequest()
        request.requestedScopes = [.fullName, .email]
        
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = self
        authorizationController.presentationContextProvider = self
        authorizationController.performRequests()
    }
    
    // MARK: - Google Sign In
    
    func signInWithGoogle() {
        self.authResult = .inProgress
        // Placeholder for Google Sign In SDK
        // GIDSignIn.sharedInstance.signIn(...)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.authResult = .success(token: "dummy_google_token", provider: .google, email: "user@gmail.com")
        }
    }
    
    // MARK: - Facebook Sign In
    
    func signInWithFacebook() {
        self.authResult = .inProgress
        // Placeholder for Facebook Login Manager
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.authResult = .success(token: "dummy_facebook_token", provider: .facebook, email: "user@facebook.com")
        }
    }
}

extension SocialAuthManager: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
            let _ = appleIDCredential.user
            let email = appleIDCredential.email
            // Identity token is usually needed for backend verification
            let identityToken = String(data: appleIDCredential.identityToken ?? Data(), encoding: .utf8) ?? ""
            
            self.authResult = .success(token: identityToken, provider: .apple, email: email)
        }
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        self.authResult = .error(error.localizedDescription)
    }
}

extension SocialAuthManager: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        // Return the current window
        return UIApplication.shared.windows.first { $0.isKeyWindow } ?? ASPresentationAnchor()
    }
}
