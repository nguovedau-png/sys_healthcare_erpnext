//
//  AppDelegate+Notifications.swift
//  mobile_ios
//
//  Created for Push Notification Setup
//

import UIKit
import UserNotifications

extension AppDelegate: UNUserNotificationCenterDelegate {
    
    /// Configure push notifications
    func configurePushNotifications() {
        UNUserNotificationCenter.current().delegate = self
        
        // Request permission
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
            if granted {
                DispatchQueue.main.async {
                    UIApplication.shared.registerForRemoteNotifications()
                }
            }
        }
    }
    
    /// Handle APNs token registration
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        let token = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
        print("APNs Token: \(token)")
        
        // Save token
        NotificationManager.shared.saveAPNsToken(token)
        
        // TODO: Send to server
        // apiService.registerDeviceToken(token)
    }
    
    /// Handle APNs registration failure
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("Failed to register for remote notifications: \(error.localizedDescription)")
    }
    
    /// Handle notification when app is in foreground
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        let userInfo = notification.request.content.userInfo
        
        // Add to in-app notifications
        if let title = userInfo["title"] as? String,
           let body = userInfo["body"] as? String {
            NotificationManager.shared.addNotification(
                title: title,
                body: body,
                type: userInfo["type"] as? String ?? "default",
                deepLink: userInfo["deepLink"] as? String
            )
        }
        
        // Show notification banner even when app is in foreground
        completionHandler([.banner, .badge, .sound])
    }
    
    /// Handle notification tap
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        let userInfo = response.notification.request.content.userInfo
        
        // Handle deep link
        if let deepLink = userInfo["deepLink"] as? String {
            handleDeepLink(deepLink)
        }
        
        completionHandler()
    }
    
    /// Handle deep link navigation
    private func handleDeepLink(_ deepLink: String) {
        // TODO: Navigate to appropriate screen
        // This should be handled by your navigation coordinator
        print("Deep link: \(deepLink)")
    }
}
