//
//  ForgotPasswordView.swift
//  mobile_ios
//
//  Created for Authentication Feature
//

import SwiftUI

struct ForgotPasswordView: View {
    @Environment(\.dismiss) var dismiss
    @State private var email = ""
    @State private var isLoading = false
    @State private var showSuccess = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                if showSuccess {
                    // Success State
                    Spacer()
                    
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 80))
                        .foregroundColor(.green)
                    
                    Text("Reset Link Sent!")
                        .font(.title)
                        .fontWeight(.bold)
                    
                    Text("We've sent a password reset link to \(email). Please check your inbox.")
                        .multilineTextAlignment(.center)
                        .foregroundColor(.secondary)
                        .padding(.horizontal)
                    
                    Spacer()
                    
                    Button(action: { dismiss() }) {
                        Text("Back to Login")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }
                    .padding(.horizontal)
                } else {
                    // Input State
                    Spacer()
                    
                    Image(systemName: "lock.shield")
                        .font(.system(size: 80))
                        .foregroundColor(.blue)
                    
                    Text("Reset Your Password")
                        .font(.title)
                        .fontWeight(.bold)
                    
                    Text("Enter your email address and we'll send you a link to reset your password")
                        .multilineTextAlignment(.center)
                        .foregroundColor(.secondary)
                        .padding(.horizontal)
                    
                    VStack(spacing: 16) {
                        HStack {
                            Image(systemName: "envelope")
                                .foregroundColor(.secondary)
                            TextField("Email Address", text: $email)
                                .keyboardType(.emailAddress)
                                .autocapitalization(.none)
                        }
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(10)
                    }
                    .padding(.horizontal)
                    
                    Spacer()
                    
                    Button(action: sendResetLink) {
                        if isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        } else {
                            Text("Send Reset Link")
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(email.contains("@") ? Color.blue : Color.gray)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .disabled(!email.contains("@") || isLoading)
                    .padding(.horizontal)
                    
                    Button("Back to Login") {
                        dismiss()
                    }
                    .padding()
                }
            }
            .padding()
            .navigationTitle("Forgot Password")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }
    
    private func sendResetLink() {
        isLoading = true
        // TODO: Call forgot password API
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            isLoading = false
            showSuccess = true
        }
    }
}
