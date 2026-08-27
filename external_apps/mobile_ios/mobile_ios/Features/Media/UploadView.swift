//
//  UploadView.swift
//  mobile_ios
//
//  Created for Media Upload Feature
//

import SwiftUI
import PhotosUI

struct UploadView: View {
    @State private var selectedItem: PhotosPickerItem? = nil
    @State private var selectedImageData: Data? = nil
    @State private var isUploading = false
    @State private var uploadResult: String? = nil
    
    var body: some View {
        VStack(spacing: 20) {
            if let selectedImageData, let uiImage = UIImage(data: selectedImageData) {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFit()
                    .frame(height: 300)
                    .cornerRadius(10)
            } else {
                Image(systemName: "photo")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 150)
                    .foregroundColor(.gray)
            }
            
            PhotosPicker(
                selection: $selectedItem,
                matching: .images,
                photoLibrary: .shared()
            ) {
                Text("Select Photo")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .onChange(of: selectedItem) { newItem in
                Task {
                    if let data = try? await newItem?.loadTransferable(type: Data.self) {
                        selectedImageData = data
                        uploadResult = nil
                    }
                }
            }
            
            if selectedImageData != nil {
                Button(action: uploadFile) {
                    if isUploading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    } else {
                        Text("Upload Now")
                    }
                }
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding()
                .background(isUploading ? Color.gray : Color.green)
                .foregroundColor(.white)
                .cornerRadius(10)
                .disabled(isUploading)
            }
            
            if let result = uploadResult {
                Text(result)
                    .foregroundColor(result.contains("Success") ? .green : .red)
                    .font(.subheadline)
            }
            
            Spacer()
        }
        .padding()
        .navigationTitle("Upload Media")
    }
    
    private func uploadFile() {
        guard let data = selectedImageData else { return }
        isUploading = true
        
        Task {
            do {
                // Determine mime type or default to image/jpeg
                let response = try await APIService.shared.uploadFile(data: data, mimeType: "image/jpeg", filename: "upload.jpg")
                uploadResult = "Success: \(response)"
            } catch {
                uploadResult = "Error: \(error.localizedDescription)"
            }
            isUploading = false
        }
    }
}
