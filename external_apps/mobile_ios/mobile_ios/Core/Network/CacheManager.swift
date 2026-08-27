//
//  CacheManager.swift
//  mobile_ios
//
//  Created for API Integration
//

import Foundation

class CacheManager {
    static let shared = CacheManager()
    
    private let fileManager = FileManager.default
    private let cacheDirectory: URL
    
    private init() {
        let cachesURL = fileManager.urls(for: .cachesDirectory, in: .userDomainMask)[0]
        cacheDirectory = cachesURL.appendingPathComponent("APICache", isDirectory: true)
        
        if !fileManager.fileExists(atPath: cacheDirectory.path) {
            try? fileManager.createDirectory(at: cacheDirectory, withIntermediateDirectories: true)
        }
    }
    
    // MARK: - Save
    func save<T: Codable>(_ data: T, forKey key: String, ttlMinutes: Int = 60) {
        let cacheData = CacheData(
            data: data,
            timestamp: Date(),
            ttl: TimeInterval(ttlMinutes * 60)
        )
        
        let fileURL = cacheDirectory.appendingPathComponent("\(key.hashValue)")
        
        do {
            let encoded = try JSONEncoder().encode(cacheData)
            try encoded.write(to: fileURL)
        } catch {
            print("Cache save error: \(error)")
        }
    }
    
    // MARK: - Get
    func get<T: Codable>(forKey key: String, as type: T.Type) -> T? {
        let fileURL = cacheDirectory.appendingPathComponent("\(key.hashValue)")
        
        guard fileManager.fileExists(atPath: fileURL.path) else {
            return nil
        }
        
        do {
            let data = try Data(contentsOf: fileURL)
            let cacheData = try JSONDecoder().decode(CacheData<T>.self, from: data)
            
            // Check if expired
            if Date().timeIntervalSince(cacheData.timestamp) > cacheData.ttl {
                try? fileManager.removeItem(at: fileURL)
                return nil
            }
            
            return cacheData.data
        } catch {
            print("Cache get error: \(error)")
            return nil
        }
    }
    
    // MARK: - Clear
    func clear(forKey key: String) {
        let fileURL = cacheDirectory.appendingPathComponent("\(key.hashValue)")
        try? fileManager.removeItem(at: fileURL)
    }
    
    func clearAll() {
        guard let files = try? fileManager.contentsOfDirectory(at: cacheDirectory, includingPropertiesForKeys: nil) else {
            return
        }
        
        for file in files {
            try? fileManager.removeItem(at: file)
        }
    }
    
    // MARK: - Validation
    func isValid(forKey key: String) -> Bool {
        let fileURL = cacheDirectory.appendingPathComponent("\(key.hashValue)")
        
        guard fileManager.fileExists(atPath: fileURL.path) else {
            return false
        }
        
        do {
            let data = try Data(contentsOf: fileURL)
            let cacheData = try JSONDecoder().decode(CacheData<AnyCodable>.self, from: data)
            return Date().timeIntervalSince(cacheData.timestamp) <= cacheData.ttl
        } catch {
            return false
        }
    }
    
    // MARK: - Helper Types
    private struct CacheData<T: Codable>: Codable {
        let data: T
        let timestamp: Date
        let ttl: TimeInterval
    }
    
    private struct AnyCodable: Codable {}
}
