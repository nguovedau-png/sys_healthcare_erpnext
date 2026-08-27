//
//  MotionManager.swift
//  mobile_ios
//
//  Created for Device Features
//

import Foundation
import CoreMotion
import Combine

struct AccelerometerData {
    let x: Double
    let y: Double
    let z: Double
    let timestamp: Date
}

struct GyroscopeData {
    let x: Double
    let y: Double
    let z: Double
    let timestamp: Date
}

class MotionManager: ObservableObject {
    static let shared = MotionManager()
    
    @Published var accelerometerData: AccelerometerData?
    @Published var gyroscopeData: GyroscopeData?
    @Published var isShaking = false
    
    private let motionManager = CMMotionManager()
    private let queue = OperationQueue()
    
    private var lastShakeTime: Date?
    private let shakeThreshold: Double = 2.5
    
    private init() {
        queue.maxConcurrentOperationCount = 1
    }
    
    /// Check if accelerometer is available
    func isAccelerometerAvailable() -> Bool {
        return motionManager.isAccelerometerAvailable
    }
    
    /// Check if gyroscope is available
    func isGyroAvailable() -> Bool {
        return motionManager.isGyroAvailable
    }
    
    /// Start accelerometer updates
    func startAccelerometerUpdates(interval: TimeInterval = 0.1) {
        guard motionManager.isAccelerometerAvailable else { return }
        
        motionManager.accelerometerUpdateInterval = interval
        motionManager.startAccelerometerUpdates(to: queue) { [weak self] data, error in
            guard let data = data, error == nil else { return }
            
            DispatchQueue.main.async {
                self?.accelerometerData = AccelerometerData(
                    x: data.acceleration.x,
                    y: data.acceleration.y,
                    z: data.acceleration.z,
                    timestamp: Date()
                )
                
                // Detect shake
                self?.detectShake(data: data)
            }
        }
    }
    
    /// Start gyroscope updates
    func startGyroscopeUpdates(interval: TimeInterval = 0.1) {
        guard motionManager.isGyroAvailable else { return }
        
        motionManager.gyroUpdateInterval = interval
        motionManager.startGyroUpdates(to: queue) { [weak self] data, error in
            guard let data = data, error == nil else { return }
            
            DispatchQueue.main.async {
                self?.gyroscopeData = GyroscopeData(
                    x: data.rotationRate.x,
                    y: data.rotationRate.y,
                    z: data.rotationRate.z,
                    timestamp: Date()
                )
            }
        }
    }
    
    /// Stop accelerometer updates
    func stopAccelerometerUpdates() {
        motionManager.stopAccelerometerUpdates()
    }
    
    /// Stop gyroscope updates
    func stopGyroscopeUpdates() {
        motionManager.stopGyroUpdates()
    }
    
    /// Stop all updates
    func stopAllUpdates() {
        stopAccelerometerUpdates()
        stopGyroscopeUpdates()
    }
    
    /// Detect shake gesture
    private func detectShake(data: CMAccelerometerData) {
        let acceleration = sqrt(
            pow(data.acceleration.x, 2) +
            pow(data.acceleration.y, 2) +
            pow(data.acceleration.z, 2)
        )
        
        if acceleration > shakeThreshold {
            let now = Date()
            if let lastShake = lastShakeTime,
               now.timeIntervalSince(lastShake) < 0.5 {
                return
            }
            
            lastShakeTime = now
            isShaking = true
            
            // Reset after delay
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                self.isShaking = false
            }
        }
    }
}
