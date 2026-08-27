//
//  CameraCaptureManager.swift
//  mobile_ios
//
//  Created for Media & Device Enhancements
//

import AVFoundation
import UIKit

enum CameraError: Error {
    case permissionDenied
    case setupFailed
    case captureFailed
}

class CameraCaptureManager: NSObject {
    static let shared = CameraCaptureManager()
    
    private let captureSession = AVCaptureSession()
    private var photoOutput = AVCapturePhotoOutput()
    private var videoPreviewLayer: AVCaptureVideoPreviewLayer?
    
    private var captureCompletion: ((Result<UIImage, Error>) -> Void)?
    
    private override init() {
        super.init()
    }
    
    /// Check camera permission
    func checkPermission(completion: @escaping (Bool) -> Void) {
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            completion(true)
        case .notDetermined:
            AVCaptureDevice.requestAccess(for: .video) { granted in
                DispatchQueue.main.async {
                    completion(granted)
                }
            }
        default:
            completion(false)
        }
    }
    
    /// Setup camera session
    func setupSession(previewView: UIView, completion: @escaping (Result<AVCaptureVideoPreviewLayer, Error>) -> Void) {
        captureSession.beginConfiguration()
        captureSession.sessionPreset = .photo
        
        // Input
        guard let backCamera = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: backCamera) else {
            completion(.failure(CameraError.setupFailed))
            captureSession.commitConfiguration()
            return
        }
        
        if captureSession.canAddInput(input) {
            captureSession.addInput(input)
        }
        
        // Output
        if captureSession.canAddOutput(photoOutput) {
            captureSession.addOutput(photoOutput)
        }
        
        captureSession.commitConfiguration()
        
        // Preview Layer
        let previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.videoGravity = .resizeAspectFill
        previewLayer.frame = previewView.bounds
        self.videoPreviewLayer = previewLayer
        
        DispatchQueue.global(qos: .userInitiated).async {
            self.captureSession.startRunning()
            DispatchQueue.main.async {
                completion(.success(previewLayer))
            }
        }
    }
    
    /// Stop camera session
    func stopSession() {
        DispatchQueue.global(qos: .userInitiated).async {
            if self.captureSession.isRunning {
                self.captureSession.stopRunning()
            }
        }
    }
    
    /// Take photo
    func takePhoto(completion: @escaping (Result<UIImage, Error>) -> Void) {
        guard captureSession.isRunning else {
            completion(.failure(CameraError.setupFailed))
            return
        }
        
        self.captureCompletion = completion
        
        let settings = AVCapturePhotoSettings()
        photoOutput.capturePhoto(with: settings, delegate: self)
    }
}

extension CameraCaptureManager: AVCapturePhotoCaptureDelegate {
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        if let error = error {
            captureCompletion?(.failure(error))
            return
        }
        
        guard let imageData = photo.fileDataRepresentation(),
              let image = UIImage(data: imageData) else {
            captureCompletion?(.failure(CameraError.captureFailed))
            return
        }
        
        // Fix orientation if needed
        let fixedImage = fixOrientation(image)
        captureCompletion?(.success(fixedImage))
    }
    
    private func fixOrientation(_ image: UIImage) -> UIImage {
        if image.imageOrientation == .up { return image }
        
        UIGraphicsBeginImageContextWithOptions(image.size, false, image.scale)
        image.draw(in: CGRect(origin: .zero, size: image.size))
        let normalizedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return normalizedImage ?? image
    }
}
