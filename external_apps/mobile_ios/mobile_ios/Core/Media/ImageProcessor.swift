//
//  ImageProcessor.swift
//  mobile_ios
//
//  Created for Media Features
//

import UIKit

class ImageProcessor {
    static let shared = ImageProcessor()
    
    private init() {}
    
    /// Compress image to specified quality
    func compressImage(_ image: UIImage, quality: CGFloat = 0.8, maxSize: CGSize = CGSize(width: 1920, height: 1080)) -> Data? {
        // Resize if needed
        let resizedImage = resizeImage(image, maxSize: maxSize)
        
        // Compress to JPEG
        return resizedImage.jpegData(compressionQuality: quality)
    }
    
    /// Resize image to fit within max size
    func resizeImage(_ image: UIImage, maxSize: CGSize) -> UIImage {
        let size = image.size
        
        if size.width <= maxSize.width && size.height <= maxSize.height {
            return image
        }
        
        let ratio = min(maxSize.width / size.width, maxSize.height / size.height)
        let newSize = CGSize(width: size.width * ratio, height: size.height * ratio)
        
        UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
        image.draw(in: CGRect(origin: .zero, size: newSize))
        let resizedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return resizedImage ?? image
    }
    
    /// Crop image to specified rectangle
    func cropImage(_ image: UIImage, rect: CGRect) -> UIImage? {
        guard let cgImage = image.cgImage else { return nil }
        
        let scale = image.scale
        let scaledRect = CGRect(
            x: rect.origin.x * scale,
            y: rect.origin.y * scale,
            width: rect.size.width * scale,
            height: rect.size.height * scale
        )
        
        guard let croppedCGImage = cgImage.cropping(to: scaledRect) else { return nil }
        
        return UIImage(cgImage: croppedCGImage, scale: scale, orientation: image.imageOrientation)
    }
    
    /// Rotate image by degrees
    func rotateImage(_ image: UIImage, degrees: CGFloat) -> UIImage? {
        let radians = degrees * .pi / 180
        
        var newSize = CGRect(origin: .zero, size: image.size)
            .applying(CGAffineTransform(rotationAngle: radians))
            .size
        
        newSize.width = floor(newSize.width)
        newSize.height = floor(newSize.height)
        
        UIGraphicsBeginImageContextWithOptions(newSize, false, image.scale)
        guard let context = UIGraphicsGetCurrentContext() else { return nil }
        
        context.translateBy(x: newSize.width / 2, y: newSize.height / 2)
        context.rotate(by: radians)
        image.draw(in: CGRect(
            x: -image.size.width / 2,
            y: -image.size.height / 2,
            width: image.size.width,
            height: image.size.height
        ))
        
        let rotatedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return rotatedImage
    }
    
    /// Fix image orientation
    func fixOrientation(_ image: UIImage) -> UIImage {
        if image.imageOrientation == .up {
            return image
        }
        
        UIGraphicsBeginImageContextWithOptions(image.size, false, image.scale)
        image.draw(in: CGRect(origin: .zero, size: image.size))
        let normalizedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return normalizedImage ?? image
    }
}
