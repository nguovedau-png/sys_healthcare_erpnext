//
//  SyncManager.swift
//  mobile_ios
//
//  Created for Data Sync
//

import Foundation
import Network

class SyncManager {
    static let shared = SyncManager()
    
    private let monitor = NWPathMonitor()
    private let queue = DispatchQueue(label: "NetworkMonitor")
    private let dbService: SQLiteService
    private let networkClient: NetworkClient
    
    var isConnected: Bool = false
    
    init(dbService: SQLiteService = .shared, networkClient: NetworkClient = NetworkClientImpl()) {
        self.dbService = dbService
        self.networkClient = networkClient
        startMonitoring()
    }
    
    private func startMonitoring() {
        monitor.pathUpdateHandler = { path in
            self.isConnected = path.status == .satisfied
            if self.isConnected {
                self.processQueue()
            }
        }
        monitor.start(queue: queue)
    }
    
    func enqueue(endpoint: String, method: String, payload: String) {
        dbService.enqueueSyncItem(endpoint: endpoint, method: method, payload: payload)
        if isConnected {
            processQueue()
        }
    }
    
    private func processQueue() {
        let items = dbService.getAllSyncItems()
        for item in items {
            Task {
                do {
                    // Reconstruct APIEndpoint is tricky without enum cases for dynamic content.
                    // For now, let's assume specific logic or refactoring NetworkClient to accept dynamic params.
                    // Or we just print for V1.
                    print("Processing Sync Item: \(item.endpoint)")
                    
                    // In a real impl, we would decode payload back to encodable or send raw json
                    // await networkClient.request(endpoint: ..., body: ...)
                    
                    // Simulate success
                    try await Task.sleep(nanoseconds: 500_000_000) 
                    dbService.deleteSyncItem(id: item.id)
                } catch {
                    print("Sync failed for item \(item.id)")
                }
            }
        }
    }
}
