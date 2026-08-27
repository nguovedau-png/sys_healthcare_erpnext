//
//  BiometricAuthManager.swift
//  mobile_ios
//
//  Created for Security & Auth Enhancements
//

import LocalAuthentication
import Foundation

enum BiometricType {
    case none
    case touchID
    case faceID
    case opticID // Vision Pro
    case unknown
}

enum BiometricError: Error {
    case notAvailable
    case failed
    case canceled
    case notEnrolled
    case unknown
}

class BiometricAuthManager {
    static let shared = BiometricAuthManager()
    
    private let context = LAContext()
    
    private init() {}
    
    /// Check if biometric authentication is available
    func canAuthenticate() -> Bool {
        var error: NSError?
        return context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error)
    }
    
    /// Get available biometric type
    func getBiometricType() -> BiometricType {
        let _ = canAuthenticate() // Needed to populate biometryType
        
        switch context.biometryType {
        case .none:
            return .none
        case .touchID:
            return .touchID
        case .faceID:
            return .faceID
        case .opticID:
            return .opticID
        @unknown default:
            return .unknown
        }
    }
    
    /// Authenticate user
    func authenticate(
        reason: String = "Log in to your account",
        completion: @escaping (Result<Bool, BiometricError>) -> Void
    ) {
        guard canAuthenticate() else {
            completion(.failure(.notAvailable))
            return
        }
        
        context.evaluatePolicy(
            .deviceOwnerAuthenticationWithBiometrics,
            localizedReason: reason
        ) { success, error in
            DispatchQueue.main.async {
                if success {
                    completion(.success(true))
                } else {
                    if let error = error as? LAError {
                        switch error.code {
                        case .userCancel, .systemCancel, .appCancel:
                            completion(.failure(.canceled))
                        case .biometryNotEnrolled:
                            completion(.failure(.notEnrolled))
                        default:
                            completion(.failure(.failed))
                        }
                    } else {
                        completion(.failure(.unknown))
                    }
                }
            }
        }
    }
}
