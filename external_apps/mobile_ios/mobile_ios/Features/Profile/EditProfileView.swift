//
//  EditProfileView.swift
//  mobile_ios
//
//  Created for Profile & Settings Feature
//

import SwiftUI

struct EditProfileView: View {
    @Environment(\.dismiss) var dismiss
    @State private var fullName: String = ""
    @State private var email: String = ""
    @State private var phone: String = ""
    @State private var bio: String = ""
    @State private var showImagePicker = false
    
    var body: some View {
        NavigationView {
            Form {
                Section {
                    // Avatar
                    HStack {
                        Spacer()
                        Button(action: { showImagePicker = true }) {
                            ZStack(alignment: .bottomTrailing) {
                                Circle()
                                    .fill(Color.blue.opacity(0.2))
                                    .frame(width: 120, height: 120)
                                    .overlay(
                                        Image(systemName: "person.fill")
                                            .font(.system(size: 50))
                                            .foregroundColor(.blue)
                                    )
                                
                                Circle()
                                    .fill(Color.blue)
                                    .frame(width: 36, height: 36)
                                    .overlay(
                                        Image(systemName: "camera.fill")
                                            .font(.system(size: 16))
                                            .foregroundColor(.white)
                                    )
                            }
                        }
                        Spacer()
                    }
                    .padding(.vertical, 8)
                }
                
                Section(header: Text("Personal Information")) {
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
                    
                    HStack {
                        Image(systemName: "phone")
                            .foregroundColor(.secondary)
                        TextField("Phone Number", text: $phone)
                            .keyboardType(.phonePad)
                    }
                }
                
                Section(header: Text("About")) {
                    HStack(alignment: .top) {
                        Image(systemName: "info.circle")
                            .foregroundColor(.secondary)
                        TextEditor(text: $bio)
                            .frame(minHeight: 100)
                    }
                }
            }
            .navigationTitle("Edit Profile")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Save") {
                        // TODO: Save profile
                        dismiss()
                    }
                    .fontWeight(.semibold)
                }
            }
            .sheet(isPresented: $showImagePicker) {
                // Image picker would go here
                Text("Image Picker")
            }
        }
    }
}
