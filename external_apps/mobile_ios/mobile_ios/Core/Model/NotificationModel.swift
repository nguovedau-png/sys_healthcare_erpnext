//
//  NotificationModel.swift
//  mobile_ios
//
//  Created for Notification Feature
//

import Foundation

struct NotificationModel: Identifiable, Codable {
    let id: String
    let title: String
    let message: String
    let timestamp: Date
    let isRead: Bool
}
