//
//  ChangePasswordView.swift
//  mobile_ios
//
//  Created for Profile & Settings Feature
//

import SwiftUI

struct ChangePasswordView: View {
    @Environment(\.dismiss) var dismiss
    @State private var currentPassword: String = ""
    @State private var newPassword: String = ""
    @State private var confirmPassword: String = ""
    @State private var showCurrentPassword = false
    @State private var showNewPassword = false
    @State private var showConfirmPassword = false
    @State private var errorMessage: String?
    
    var isValid: Bool {
        !currentPassword.isEmpty &&
        newPassword.count >= 8 &&
        newPassword == confirmPassword
    }
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Security"),
                       footer: Text("Create a strong password with at least 8 characters")) {
                    // Current Password
                    HStack {
                        Image(systemName: "lock")
                            .foregroundColor(.secondary)
                        if showCurrentPassword {
                            TextField("Current Password", text: $currentPassword)
                        } else {
                            SecureField("Current Password", text: $currentPassword)
                        }
                        Button(action: { showCurrentPassword.toggle() }) {
                            Image(systemName: showCurrentPassword ? "eye.slash" : "eye")
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    // New Password
                    HStack {
                        Image(systemName: "lock.fill")
                            .foregroundColor(.secondary)
                        if showNewPassword {
                            TextField("New Password", text: $newPassword)
                        } else {
                            SecureField("New Password", text: $newPassword)
                        }
                        Button(action: { showNewPassword.toggle() }) {
                            Image(systemName: showNewPassword ? "eye.slash" : "eye")
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    if !newPassword.isEmpty && newPassword.count < 8 {
                        Text("Password must be at least 8 characters")
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                    
                    // Confirm Password
                    HStack {
                        Image(systemName: "lock.fill")
                            .foregroundColor(.secondary)
                        if showConfirmPassword {
                            TextField("Confirm New Password", text: $confirmPassword)
                        } else {
                            SecureField("Confirm New Password", text: $confirmPassword)
                        }
                        Button(action: { showConfirmPassword.toggle() }) {
                            Image(systemName: showConfirmPassword ? "eye.slash" : "eye")
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    if !confirmPassword.isEmpty && confirmPassword != newPassword {
                        Text("Passwords do not match")
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }
                
                if let error = errorMessage {
                    Section {
                        Text(error)
                            .foregroundColor(.red)
                    }
                }
                
                Section {
                    Button(action: changePassword) {
                        Text("Change Password")
                            .frame(maxWidth: .infinity)
                            .fontWeight(.semibold)
                    }
                    .disabled(!isValid)
                }
            }
            .navigationTitle("Change Password")
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
    
    private func changePassword() {
        guard currentPassword.isNotEmpty else {
            errorMessage = "Please enter current password"
            return
        }
        
        guard newPassword.count >= 8 else {
            errorMessage = "New password must be at least 8 characters"
            return
        }
        
        guard newPassword == confirmPassword else {
            errorMessage = "Passwords do not match"
            return
        }
        
        // TODO: Call API to change password
        dismiss()
    }
}

extension String {
    var isNotEmpty: Bool {
        !self.isEmpty
    }
}
