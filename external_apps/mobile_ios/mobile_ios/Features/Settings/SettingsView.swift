//
//  SettingsView.swift
//  mobile_ios
//
//  Created for UI/UX Enhancement
//

import SwiftUI

struct SettingsView: View {
    @StateObject private var viewModel = SettingsViewModel()
    @State private var isDarkMode = false
    @State private var areNotificationsEnabled = true
    @State private var selectedLanguage = "Tiếng Việt"
    
    var body: some View {
        NavigationView {
            List {
                // Account Section
                Section(header: Text("Tài Khoản")) {
                    NavigationLink(destination: EditProfileView()) {
                        HStack {
                            Image(systemName: "person.circle")
                                .foregroundColor(.blue)
                            Text("Chỉnh sửa thông tin")
                        }
                    }
                    
                    NavigationLink(destination: ChangePasswordView()) {
                        HStack {
                            Image(systemName: "lock.circle")
                                .foregroundColor(.blue)
                            Text("Đổi mật khẩu")
                        }
                    }
                }
                
                // Preferences Section
                Section(header: Text("Cài Đặt")) {
                    Toggle(isOn: $isDarkMode) {
                        HStack {
                            Image(systemName: "moon.circle")
                                .foregroundColor(.purple)
                            Text("Giao diện tối")
                        }
                    }
                    
                    Toggle(isOn: $areNotificationsEnabled) {
                        HStack {
                            Image(systemName: "bell.circle")
                                .foregroundColor(.red)
                            Text("Thông báo")
                        }
                    }
                    
                    HStack {
                        Image(systemName: "globe")
                            .foregroundColor(.green)
                        Text("Ngôn ngữ")
                        Spacer()
                        Text(selectedLanguage)
                            .foregroundColor(.gray)
                    }
                }
                
                // Security Section
                Section(header: Text("Bảo Mật")) {
                    NavigationLink(destination: Text("Biometric Settings")) {
                        HStack {
                            Image(systemName: "faceid")
                                .foregroundColor(.orange)
                            Text("Sinh trắc học")
                        }
                    }
                }
                
                // App Info Section
                Section(header: Text("Thông Tin Ứng Dụng")) {
                    HStack {
                        Text("Phiên bản")
                        Spacer()
                        Text("1.0.0 (1)")
                            .foregroundColor(.gray)
                    }
                    
                    Button(action: {
                        // Handle logout
                        viewModel.logout()
                    }) {
                        Text("Đăng Xuất")
                            .foregroundColor(.red)
                    }
                }
            }
            .listStyle(InsetGroupedListStyle())
            .navigationTitle("Cài Đặt")
        }
    }
}

class SettingsViewModel: ObservableObject {
    func logout() {
        // Implement logout logic
        print("User logged out")
    }
}

struct EditProfileView: View {
    var body: some View {
        Text("Edit Profile Screen Placeholder")
    }
}

struct ChangePasswordView: View {
    var body: some View {
        Text("Change Password Screen Placeholder")
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
    }
}
