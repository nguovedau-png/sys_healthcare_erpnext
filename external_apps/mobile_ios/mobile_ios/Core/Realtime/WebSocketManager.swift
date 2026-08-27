//
//  WebSocketManager.swift
//  mobile_ios
//
//  Created for Realtime Feature
//

import Foundation
import SocketIO

enum ConnectionState {
    case disconnected
    case connecting
    case connected
    case error(String)
}

class WebSocketManager: ObservableObject {
    static let shared = WebSocketManager()
    
    @Published var connectionState: ConnectionState = .disconnected
    
    private var manager: SocketManager?
    private var socket: SocketIOClient?
    
    private init() {}
    
    func connect(url: String, token: String? = nil) {
        connectionState = .connecting
        
        var config: SocketIOClientConfiguration = [
            .log(false),
            .compress,
            .reconnects(true),
            .reconnectAttempts(5),
            .reconnectWait(1)
        ]
        
        if let token = token {
            config.insert(.connectParams(["token": token]))
        }
        
        guard let socketURL = URL(string: url) else {
            connectionState = .error("Invalid URL")
            return
        }
        
        manager = SocketManager(socketURL: socketURL, config: config)
        socket = manager?.defaultSocket
        
        socket?.on(clientEvent: .connect) { [weak self] _, _ in
            self?.connectionState = .connected
        }
        
        socket?.on(clientEvent: .disconnect) { [weak self] _, _ in
            self?.connectionState = .disconnected
        }
        
        socket?.on(clientEvent: .error) { [weak self] data, _ in
            let error = data.first as? String ?? "Connection error"
            self?.connectionState = .error(error)
        }
        
        socket?.connect()
    }
    
    func disconnect() {
        socket?.disconnect()
        connectionState = .disconnected
    }
    
    func on(event: String, callback: @escaping ([Any]) -> Void) {
        socket?.on(event, callback: callback)
    }
    
    func off(event: String) {
        socket?.off(event)
    }
    
    func emit(event: String, items: [Any]) {
        socket?.emit(event, items)
    }
    
    func isConnected() -> Bool {
        return socket?.status == .connected
    }
    
    // MARK: - Common Events
    func onMessage(callback: @escaping ([String: Any]) -> Void) {
        on(event: "message") { data in
            if let dict = data.first as? [String: Any] {
                callback(dict)
            }
        }
    }
    
    func onNotification(callback: @escaping ([String: Any]) -> Void) {
        on(event: "notification") { data in
            if let dict = data.first as? [String: Any] {
                callback(dict)
            }
        }
    }
    
    func onUserStatusChange(callback: @escaping ([String: Any]) -> Void) {
        on(event: "user_status") { data in
            if let dict = data.first as? [String: Any] {
                callback(dict)
            }
        }
    }
    
    func sendMessage(message: String, recipientId: String) {
        let data: [String: Any] = [
            "message": message,
            "recipientId": recipientId,
            "timestamp": Date().timeIntervalSince1970
        ]
        emit(event: "send_message", items: [data])
    }
}
