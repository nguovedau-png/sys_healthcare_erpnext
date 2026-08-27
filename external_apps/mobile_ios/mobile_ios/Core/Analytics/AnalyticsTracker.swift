//
//  AnalyticsTracker.swift
//  mobile_ios
//
//  Created for Analytics & Monitoring
//

import Foundation

struct AnalyticsEvent {
    let name: String
    let parameters: [String: Any]
    let timestamp: Date
}

#if canImport(FirebaseAnalytics)
import FirebaseAnalytics
#endif

class AnalyticsTracker {
    static let shared = AnalyticsTracker()
    
    private var eventQueue: [AnalyticsEvent] = []
    
    private init() {}
    
    /// Track custom event
    func trackEvent(_ eventName: String, parameters: [String: Any] = [:]) {
        let event = AnalyticsEvent(name: eventName, parameters: parameters, timestamp: Date())
        eventQueue.append(event)
        
        // TODO: Send to Firebase Analytics
        #if canImport(FirebaseAnalytics)
        Analytics.logEvent(eventName, parameters: parameters)
        #endif
        
        print("Analytics: \(eventName) - \(parameters)")
    }
    
    /// Track screen view
    func trackScreenView(_ screenName: String, screenClass: String? = nil) {
        trackEvent("screen_view", parameters: [
            "screen_name": screenName,
            "screen_class": screenClass ?? screenName
        ])
    }
    
    /// Track user action
    func trackUserAction(_ action: String, target: String? = nil) {
        var params: [String: Any] = ["action": action]
        if let target = target {
            params["target"] = target
        }
        trackEvent("user_action", parameters: params)
    }
    
    /// Track purchase
    func trackPurchase(itemId: String, value: Double, currency: String = "USD") {
        trackEvent("purchase", parameters: [
            "item_id": itemId,
            "value": value,
            "currency": currency
        ])
    }
    
    /// Track search
    func trackSearch(query: String, results: Int = 0) {
        trackEvent("search", parameters: [
            "search_term": query,
            "results_count": results
        ])
    }
    
    /// Track login
    func trackLogin(method: String) {
        trackEvent("login", parameters: ["method": method])
    }
    
    /// Track signup
    func trackSignup(method: String) {
        trackEvent("sign_up", parameters: ["method": method])
    }
    
    /// Set user property
    func setUserProperty(_ name: String, value: String) {
        #if canImport(FirebaseAnalytics)
        Analytics.setUserProperty(value, forName: name)
        #endif
        
        print("User Property: \(name) = \(value)")
    }
    
    /// Set user ID
    func setUserId(_ userId: String) {
        #if canImport(FirebaseAnalytics)
        Analytics.setUserID(userId)
        #endif
        
        print("User ID: \(userId)")
    }
    
    /// Get all events (for debugging)
    func getEvents() -> [AnalyticsEvent] {
        return eventQueue
    }
    
    /// Clear event queue
    func clearEvents() {
        eventQueue.removeAll()
    }
}
