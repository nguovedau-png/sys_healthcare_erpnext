//
//  NotificationManager.swift
//  mobile_ios
//
//  Created for Notification & Realtime Feature
//

import Foundation
import UserNotifications

struct InAppNotification: Identifiable, Codable {
    let id: String
    let title: String
    let body: String
    let type: String
    let deepLink: String?
    let timestamp: Date
    var isRead: Bool
    
    init(id: String = UUID().uuidString, title: String, body: String, type: String, deepLink: String? = nil, timestamp: Date = Date(), isRead: Bool = false) {
        self.id = id
        self.title = title
        self.body = body
        self.type = type
        self.deepLink = deepLink
        self.timestamp = timestamp
        self.isRead = isRead
    }
}

class NotificationManager: ObservableObject {
    static let shared = NotificationManager()
    
    @Published var notifications: [InAppNotification] = []
    @Published var badgeCount: Int = 0
    
    private let defaults = UserDefaults.standard
    private let badgeCountKey = "badge_count"
    private let apnsTokenKey = "apns_token"
    
    private init() {
        loadBadgeCount()
    }
    
    // MARK: - APNs Token
    func saveAPNsToken(_ token: String) {
        defaults.set(token, forKey: apnsTokenKey)
        // TODO: Send to server
    }
    
    func getAPNsToken() -> String? {
        return defaults.string(forKey: apnsTokenKey)
    }
    
    // MARK: - In-App Notifications
    func addNotification(title: String, body: String, type: String, deepLink: String? = nil) {
        let notification = InAppNotification(
            title: title,
            body: body,
            type: type,
            deepLink: deepLink
        )
        notifications.insert(notification, at: 0)
        incrementBadgeCount()
    }
    
    func markAsRead(_ notificationId: String) {
        if let index = notifications.firstIndex(where: { $0.id == notificationId }) {
            notifications[index].isRead = true
            decrementBadgeCount()
        }
    }
    
    func markAllAsRead() {
        notifications = notifications.map { var n = $0; n.isRead = true; return n }
        clearBadgeCount()
    }
    
    func deleteNotification(_ notificationId: String) {
        if let notification = notifications.first(where: { $0.id == notificationId }) {
            notifications.removeAll { $0.id == notificationId }
            if !notification.isRead {
                decrementBadgeCount()
            }
        }
    }
    
    func clearAll() {
        notifications.removeAll()
        clearBadgeCount()
    }
    
    // MARK: - Badge Count
    func incrementBadgeCount() {
        badgeCount += 1
        saveBadgeCount()
        updateAppBadge()
    }
    
    func decrementBadgeCount() {
        if badgeCount > 0 {
            badgeCount -= 1
            saveBadgeCount()
            updateAppBadge()
        }
    }
    
    func clearBadgeCount() {
        badgeCount = 0
        saveBadgeCount()
        updateAppBadge()
    }
    
    private func saveBadgeCount() {
        defaults.set(badgeCount, forKey: badgeCountKey)
    }
    
    private func loadBadgeCount() {
        badgeCount = defaults.integer(forKey: badgeCountKey)
    }
    
    private func updateAppBadge() {
        UNUserNotificationCenter.current().setBadgeCount(badgeCount)
    }
    
    func getUnreadCount() -> Int {
        return notifications.filter { !$0.isRead }.count
    }
    
    // MARK: - Request Permission
    func requestPermission(completion: @escaping (Bool) -> Void) {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
            DispatchQueue.main.async {
                completion(granted)
            }
        }
    }
}
