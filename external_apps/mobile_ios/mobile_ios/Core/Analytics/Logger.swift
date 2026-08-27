//
//  Logger.swift
//  mobile_ios
//
//  Created for Analytics & Monitoring
//

import Foundation
import os.log

enum LogLevel: String {
    case verbose = "VERBOSE"
    case debug = "DEBUG"
    case info = "INFO"
    case warn = "WARN"
    case error = "ERROR"
}

struct LogEntry {
    let level: LogLevel
    let tag: String
    let message: String
    let error: Error?
    let timestamp: Date
}

class Logger {
    static let shared = Logger()
    
    private var logs: [LogEntry] = []
    private let maxLogs = 1000
    private let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss.SSS"
        return formatter
    }()
    
    private init() {}
    
    /// Log verbose message
    func v(_ tag: String, _ message: String) {
        log(.verbose, tag: tag, message: message)
        os_log("%{public}@", log: OSLog(subsystem: tag, category: "verbose"), type: .debug, message)
    }
    
    /// Log debug message
    func d(_ tag: String, _ message: String) {
        log(.debug, tag: tag, message: message)
        os_log("%{public}@", log: OSLog(subsystem: tag, category: "debug"), type: .debug, message)
    }
    
    /// Log info message
    func i(_ tag: String, _ message: String) {
        log(.info, tag: tag, message: message)
        os_log("%{public}@", log: OSLog(subsystem: tag, category: "info"), type: .info, message)
    }
    
    /// Log warning message
    func w(_ tag: String, _ message: String, error: Error? = nil) {
        log(.warn, tag: tag, message: message, error: error)
        os_log("%{public}@", log: OSLog(subsystem: tag, category: "warn"), type: .error, message)
    }
    
    /// Log error message
    func e(_ tag: String, _ message: String, error: Error? = nil) {
        log(.error, tag: tag, message: message, error: error)
        os_log("%{public}@", log: OSLog(subsystem: tag, category: "error"), type: .fault, message)
    }
    
    /// Internal log storage
    private func log(_ level: LogLevel, tag: String, message: String, error: Error? = nil) {
        let entry = LogEntry(level: level, tag: tag, message: message, error: error, timestamp: Date())
        logs.append(entry)
        
        // Keep only last maxLogs entries
        if logs.count > maxLogs {
            logs.removeFirst()
        }
    }
    
    /// Get all logs
    func getLogs() -> [LogEntry] {
        return logs
    }
    
    /// Get logs by level
    func getLogsByLevel(_ level: LogLevel) -> [LogEntry] {
        return logs.filter { $0.level == level }
    }
    
    /// Get logs by tag
    func getLogsByTag(_ tag: String) -> [LogEntry] {
        return logs.filter { $0.tag == tag }
    }
    
    /// Export logs to file
    func exportLogs(to url: URL) -> Bool {
        do {
            var content = ""
            for entry in logs {
                let timestamp = dateFormatter.string(from: entry.timestamp)
                let line = "[\(timestamp)] [\(entry.level.rawValue)] [\(entry.tag)] \(entry.message)\n"
                content += line
                
                if let error = entry.error {
                    content += "\(error.localizedDescription)\n"
                }
            }
            
            try content.write(to: url, atomically: true, encoding: .utf8)
            return true
        } catch {
            print("Logger: Failed to export logs - \(error)")
            return false
        }
    }
    
    /// Clear all logs
    func clearLogs() {
        logs.removeAll()
    }
    
    /// Format log entry as string
    func formatLogEntry(_ entry: LogEntry) -> String {
        let timestamp = dateFormatter.string(from: entry.timestamp)
        return "[\(timestamp)] [\(entry.level.rawValue)] [\(entry.tag)] \(entry.message)"
    }
}
