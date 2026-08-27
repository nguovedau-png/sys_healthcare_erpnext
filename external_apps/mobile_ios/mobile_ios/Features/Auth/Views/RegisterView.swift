//
//  RegisterView.swift
//  mobile_ios
//
//  Created for Authentication Feature
//

import SwiftUI

struct RegisterView: View {
    @Environment(\.dismiss) var dismiss
    @State private var fullName = ""
    @State private var email = ""
    @State private var phone = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var showPassword = false
    @State private var showConfirmPassword = false
    @State private var agreeToTerms = false
    @State private var errorMessage: String?
    
    var isValid: Bool {
        !fullName.isEmpty &&
        email.contains("@") &&
        password.count >= 8 &&
        password == confirmPassword &&
        agreeToTerms
    }
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Account Information")) {
                    HStack {
                        Image(systemName: "person")
                            .foregroundColor(.secondary)
                        TextField("Full Name", text: $fullName)
                    }
                    
                    HStack {
                        Image(systemName: "envelope")
                            .foregroundColor(.secondary)
                        TextField("Email", text: $email)
                            .keyboardType(.emailAddress)
                            .autocapitalization(.none)
                    }
                    
                    if !email.isEmpty && !email.contains("@") {
                        Text("Please enter a valid email")
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                    
                    HStack {
                        Image(systemName: "phone")
                            .foregroundColor(.secondary)
                        TextField("Phone Number (Optional)", text: $phone)
                            .keyboardType(.phonePad)
                    }
                }
                
                Section(header: Text("Security")) {
                    HStack {
                        Image(systemName: "lock")
                            .foregroundColor(.secondary)
                        if showPassword {
                            TextField("Password", text: $password)
                        } else {
                            SecureField("Password", text: $password)
                        }
                        Button(action: { showPassword.toggle() }) {
                            Image(systemName: showPassword ? "eye.slash" : "eye")
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    if !password.isEmpty && password.count < 8 {
                        Text("Password must be at least 8 characters")
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                    
                    HStack {
                        Image(systemName: "lock.fill")
                            .foregroundColor(.secondary)
                        if showConfirmPassword {
                            TextField("Confirm Password", text: $confirmPassword)
                        } else {
                            SecureField("Confirm Password", text: $confirmPassword)
                        }
                        Button(action: { showConfirmPassword.toggle() }) {
                            Image(systemName: showConfirmPassword ? "eye.slash" : "eye")
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    if !confirmPassword.isEmpty && confirmPassword != password {
                        Text("Passwords do not match")
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }
                
                Section {
                    Toggle(isOn: $agreeToTerms) {
                        Text("I agree to the Terms and Conditions")
                            .font(.subheadline)
                    }
                }
                
                if let error = errorMessage {
                    Section {
                        Text(error)
                            .foregroundColor(.red)
                    }
                }
                
                Section {
                    Button(action: register) {
                        Text("Create Account")
                            .frame(maxWidth: .infinity)
                            .fontWeight(.semibold)
                    }
                    .disabled(!isValid)
                }
            }
            .navigationTitle("Create Account")
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
    
    private func register() {
        // TODO: Call register API
        dismiss()
    }
}
