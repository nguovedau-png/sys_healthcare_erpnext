//
//  CodeScanner.swift
//  mobile_ios
//
//  Created for Device Features
//

import SwiftUI
import AVFoundation

struct ScanResult {
    let value: String
    let type: AVMetadataObject.ObjectType
}

struct CodeScannerView: UIViewControllerRepresentable {
    @Binding var scanResult: ScanResult?
    let codeTypes: [AVMetadataObject.ObjectType]
    let onScan: (ScanResult) -> Void
    
    func makeUIViewController(context: Context) -> CodeScannerViewController {
        let controller = CodeScannerViewController()
        controller.delegate = context.coordinator
        controller.codeTypes = codeTypes
        return controller
    }
    
    func updateUIViewController(_ uiViewController: CodeScannerViewController, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, CodeScannerDelegate {
        let parent: CodeScannerView
        
        init(_ parent: CodeScannerView) {
            self.parent = parent
        }
        
        func didScan(result: ScanResult) {
            parent.scanResult = result
            parent.onScan(result)
        }
    }
}

protocol CodeScannerDelegate: AnyObject {
    func didScan(result: ScanResult)
}

class CodeScannerViewController: UIViewController {
    weak var delegate: CodeScannerDelegate?
    var codeTypes: [AVMetadataObject.ObjectType] = [.qr]
    
    private var captureSession: AVCaptureSession?
    private var previewLayer: AVCaptureVideoPreviewLayer?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupCamera()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        startScanning()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        stopScanning()
    }
    
    private func setupCamera() {
        captureSession = AVCaptureSession()
        
        guard let videoCaptureDevice = AVCaptureDevice.default(for: .video) else { return }
        let videoInput: AVCaptureDeviceInput
        
        do {
            videoInput = try AVCaptureDeviceInput(device: videoCaptureDevice)
        } catch {
            return
        }
        
        if captureSession?.canAddInput(videoInput) == true {
            captureSession?.addInput(videoInput)
        } else {
            return
        }
        
        let metadataOutput = AVCaptureMetadataOutput()
        
        if captureSession?.canAddOutput(metadataOutput) == true {
            captureSession?.addOutput(metadataOutput)
            
            metadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
            metadataOutput.metadataObjectTypes = codeTypes
        } else {
            return
        }
        
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession!)
        previewLayer?.frame = view.layer.bounds
        previewLayer?.videoGravity = .resizeAspectFill
        view.layer.addSublayer(previewLayer!)
    }
    
    func startScanning() {
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            self?.captureSession?.startRunning()
        }
    }
    
    func stopScanning() {
        captureSession?.stopRunning()
    }
}

extension CodeScannerViewController: AVCaptureMetadataOutputObjectsDelegate {
    func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        guard let metadataObject = metadataObjects.first,
              let readableObject = metadataObject as? AVMetadataMachineReadableCodeObject,
              let stringValue = readableObject.stringValue else { return }
        
        let result = ScanResult(value: stringValue, type: readableObject.type)
        delegate?.didScan(result: result)
    }
}
