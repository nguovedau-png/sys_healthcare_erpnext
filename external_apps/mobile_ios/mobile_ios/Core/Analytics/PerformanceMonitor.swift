//
//  PerformanceMonitor.swift
//  mobile_ios
//
//  Created for Analytics & Monitoring
//

import Foundation

struct PerformanceMetric {
    let name: String
    let durationMs: Int64
    let attributes: [String: String]
    let timestamp: Date
}

class PerformanceMonitor {
    static let shared = PerformanceMonitor()
    
    private var metrics: [PerformanceMetric] = []
    private var activeTraces: [String: Date] = [:]
    private let appStartTime = Date()
    
    private init() {}
    
    /// Start performance trace
    func startTrace(_ traceName: String) {
        activeTraces[traceName] = Date()
        print("PerformanceMonitor: Started trace: \(traceName)")
    }
    
    /// Stop performance trace
    func stopTrace(_ traceName: String, attributes: [String: String] = [:]) {
        guard let startTime = activeTraces.removeValue(forKey: traceName) else { return }
        
        let duration = Int64(Date().timeIntervalSince(startTime) * 1000)
        let metric = PerformanceMetric(
            name: traceName,
            durationMs: duration,
            attributes: attributes,
            timestamp: Date()
        )
        metrics.append(metric)
        
        print("PerformanceMonitor: Stopped trace: \(traceName) (\(duration)ms)")
        
        // TODO: Send to Firebase Performance
        // let trace = Performance.startTrace(name: traceName)
        // attributes.forEach { trace?.setValue($0.value, forAttribute: $0.key) }
        // trace?.stop()
    }
    
    /// Measure execution time of a block
    func measureTime<T>(_ traceName: String, block: () -> T) -> T {
        startTrace(traceName)
        defer { stopTrace(traceName) }
        return block()
    }
    
    /// Track network request performance
    func trackNetworkRequest(
        url: String,
        method: String,
        statusCode: Int,
        durationMs: Int64,
        requestSize: Int64 = 0,
        responseSize: Int64 = 0
    ) {
        let metric = PerformanceMetric(
            name: "network_request",
            durationMs: durationMs,
            attributes: [
                "url": url,
                "method": method,
                "status_code": "\(statusCode)",
                "request_size": "\(requestSize)",
                "response_size": "\(responseSize)"
            ],
            timestamp: Date()
        )
        metrics.append(metric)
        
        print("PerformanceMonitor: Network: \(method) \(url) - \(statusCode) (\(durationMs)ms)")
    }
    
    /// Track screen rendering time
    func trackScreenLoad(_ screenName: String, durationMs: Int64) {
        let metric = PerformanceMetric(
            name: "screen_load",
            durationMs: durationMs,
            attributes: ["screen_name": screenName],
            timestamp: Date()
        )
        metrics.append(metric)
        
        print("PerformanceMonitor: Screen load: \(screenName) (\(durationMs)ms)")
    }
    
    /// Get app start time
    func getAppStartTime() -> TimeInterval {
        return Date().timeIntervalSince(appStartTime)
    }
    
    /// Get all metrics
    func getMetrics() -> [PerformanceMetric] {
        return metrics
    }
    
    /// Get metrics by name
    func getMetricsByName(_ name: String) -> [PerformanceMetric] {
        return metrics.filter { $0.name == name }
    }
    
    /// Get average duration for metric
    func getAverageDuration(_ name: String) -> Int64 {
        let filtered = getMetricsByName(name)
        guard !filtered.isEmpty else { return 0 }
        return filtered.reduce(0) { $0 + $1.durationMs } / Int64(filtered.count)
    }
    
    /// Clear metrics
    func clearMetrics() {
        metrics.removeAll()
    }
}
