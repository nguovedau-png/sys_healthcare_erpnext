import SwiftUI

struct LoginView: View {
    @StateObject private var viewModel = LoginViewModel()
    
    var body: some View {
        ZStack {
            Color.backgroundLight.ignoresSafeArea()
            
            VStack(spacing: 32) {
                // Header
                VStack(spacing: 8) {
                    Text("welcome_back")
                        .font(.system(size: 32, weight: .bold))
                        .foregroundColor(.primaryBlue)
                    
                    Text("sign_in_subtitle")
                        .font(.system(size: 16))
                        .foregroundColor(.textSecondary)
                }
                .padding(.top, 60)
                
                // Form
                VStack(spacing: 20) {
                    // Email Field
                    VStack(alignment: .leading, spacing: 8) {
                        Text("email_label")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.textPrimary)
                        
                        HStack {
                            Image(systemName: "envelope")
                                .foregroundColor(.textSecondary)
                            TextField("email_placeholder", text: $viewModel.email)
                                .textInputAutocapitalization(.never)
                                .keyboardType(.emailAddress)
                        }
                        .padding()
                        .background(Color.surfaceWhite)
                        .cornerRadius(12)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.2), lineWidth: 1)
                        )
                    }
                    
                    // Password Field
                    VStack(alignment: .leading, spacing: 8) {
                        Text("password_label")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.textPrimary)
                        
                        HStack {
                            Image(systemName: "lock")
                                .foregroundColor(.textSecondary)
                            SecureField("password_placeholder", text: $viewModel.password)
                        }
                        .padding()
                        .background(Color.surfaceWhite)
                        .cornerRadius(12)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.2), lineWidth: 1)
                        )
                    }
                    
                    // Forgot Password
                    HStack {
                        Spacer()
                        Button("forgot_password") {
                            // TODO: Implement forgot password
                        }
                        .font(.system(size: 14))
                        .foregroundColor(.primaryBlue)
                    }
                }
                .padding(.horizontal, 24)
                
                // Error Message
                if let error = viewModel.errorMessage {
                    Text(error)
                        .font(.system(size: 14))
                        .foregroundColor(.errorRed)
                        .padding(.horizontal, 24)
                }
                
                // Sign In Button
                Button(action: {
                    Task {
                        await viewModel.login()
                    }
                }) {
                    HStack {
                        if viewModel.isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        } else {
                            Text("sign_in_button")
                                .font(.system(size: 16, weight: .semibold))
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.primaryBlue)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                }
                .disabled(viewModel.isLoading)
                .padding(.horizontal, 24)
                
                // OR Divider
                HStack {
                    VStack { Divider() }
                    Text("OR")
                        .font(.system(size: 14))
                        .foregroundColor(.textSecondary)
                        .padding(.horizontal, 8)
                    VStack { Divider() }
                }
                .padding(.vertical, 16)
                .padding(.horizontal, 24)
                
                // Social Auth Buttons
                VStack(spacing: 12) {
                    Button(action: {
                        SocialAuthManager.shared.signInWithGoogle()
                    }) {
                        HStack {
                            Image(systemName: "envelope.fill") // Placeholder for Google
                            Text("Continue with Google")
                        }
                        .font(.system(size: 16))
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.white)
                        .foregroundColor(.black)
                        .cornerRadius(12)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.3), lineWidth: 1)
                        )
                    }
                    
                    Button(action: {
                        SocialAuthManager.shared.signInWithFacebook()
                    }) {
                        HStack {
                            Image(systemName: "f.square.fill") // Placeholder for Facebook
                            Text("Continue with Facebook")
                        }
                        .font(.system(size: 16))
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                    }
                    
                    Button(action: {
                        SocialAuthManager.shared.signInWithApple()
                    }) {
                        HStack {
                            Image(systemName: "applelogo")
                            Text("Continue with Apple")
                        }
                        .font(.system(size: 16))
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.black)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                    }
                }
                .padding(.horizontal, 24)
                
                // Register Link
                HStack {
                    Text("Don't have an account?")
                        .font(.system(size: 14))
                        .foregroundColor(.textSecondary)
                    Button("Sign Up") {
                        // Navigate to Register
                    }
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.primaryBlue)
                }
                .padding(.top, 16)
            }
        }
        // .fullScreenCover removed - navigation handled by Root View
        .sheet(isPresented: $viewModel.requires2FA) {
            TwoFactorView()
        }
        // .onAppear removed - session checked by Root View
    }
}
