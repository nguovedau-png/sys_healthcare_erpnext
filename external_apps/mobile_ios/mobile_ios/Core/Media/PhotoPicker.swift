//
//  PhotoPicker.swift
//  mobile_ios
//
//  Created for Media Features
//

import SwiftUI
import PhotosUI

struct PhotoPicker: UIViewControllerRepresentable {
    @Binding var selectedImages: [UIImage]
    let selectionLimit: Int
    
    func makeUIViewController(context: Context) -> PHPickerViewController {
        var config = PHPickerConfiguration()
        config.filter = .images
        config.selectionLimit = selectionLimit
        
        let picker = PHPickerViewController(configuration: config)
        picker.delegate = context.coordinator
        return picker
    }
    
    func updateUIViewController(_ uiViewController: PHPickerViewController, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, PHPickerViewControllerDelegate {
        let parent: PhotoPicker
        
        init(_ parent: PhotoPicker) {
            self.parent = parent
        }
        
        func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
            picker.dismiss(animated: true)
            
            var images: [UIImage] = []
            let group = DispatchGroup()
            
            for result in results {
                group.enter()
                result.itemProvider.loadObject(ofClass: UIImage.self) { object, error in
                    defer { group.leave() }
                    if let image = object as? UIImage {
                        images.append(image)
                    }
                }
            }
            
            group.notify(queue: .main) {
                self.parent.selectedImages = images
            }
        }
    }
}

// SwiftUI wrapper for easy use
struct PhotoPickerButton: View {
    @Binding var selectedImages: [UIImage]
    let selectionLimit: Int
    @State private var showPicker = false
    
    var body: some View {
        Button("Select Photos") {
            showPicker = true
        }
        .sheet(isPresented: $showPicker) {
            PhotoPicker(selectedImages: $selectedImages, selectionLimit: selectionLimit)
        }
    }
}
