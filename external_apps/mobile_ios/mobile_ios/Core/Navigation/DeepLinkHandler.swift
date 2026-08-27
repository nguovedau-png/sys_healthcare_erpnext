//
//  DeepLinkHandler.swift
//  mobile_ios
//
//  Created for Deep Linking Feature
//

import Foundation
import SwiftUI

class DeepLinkHandler {
    static let shared = DeepLinkHandler()
    
    private init() {}
    
    func handleDeepLink(_ urlString: String?) -> String? {
        guard let urlString = urlString,
              let url = URL(string: urlString) else {
            return nil
        }
        
        switch url.host {
        case "profile":
            if let userId = url.queryParameters?["userId"] {
                return "profile/\(userId)"
            }
        case "chat":
            if let chatId = url.queryParameters?["chatId"] {
                return "chat/\(chatId)"
            }
        case "notification":
            if let notificationId = url.queryParameters?["id"] {
                return "notification/\(notificationId)"
            }
        case "payment":
            if let invoiceId = url.queryParameters?["invoiceId"] {
                return "payment/invoice/\(invoiceId)"
            }
        default:
            return "home"
        }
        
        return nil
    }
    
    // MARK: - Deep Link Builders
    static func buildProfileLink(userId: String) -> String {
        return "myapp://profile?userId=\(userId)"
    }
    
    static func buildChatLink(chatId: String) -> String {
        return "myapp://chat?chatId=\(chatId)"
    }
    
    static func buildNotificationLink(notificationId: String) -> String {
        return "myapp://notification?id=\(notificationId)"
    }
    
    static func buildPaymentLink(invoiceId: String) -> String {
        return "myapp://payment?invoiceId=\(invoiceId)"
    }
}

extension URL {
    var queryParameters: [String: String]? {
        guard let components = URLComponents(url: self, resolvingAgainstBaseURL: false),
              let queryItems = components.queryItems else {
            return nil
        }
        
        var parameters = [String: String]()
        for item in queryItems {
            parameters[item.name] = item.value
        }
        return parameters
    }
}
