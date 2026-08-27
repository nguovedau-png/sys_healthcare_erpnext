package com.example.mobile_android.data.analytics

import android.content.Context
import android.os.Bundle
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject
import javax.inject.Singleton

import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.analytics.ktx.analytics
import com.example.mobile_android.data.analytics.AnalyticsEvent
import com.google.firebase.ktx.Firebase

/**
 * Analytics Tracker for event tracking
 * Integrated with Firebase Analytics
 */

data class AnalyticsEvent(
    val name: String,
    val parameters: Map<String, Any> = emptyMap(),
    val timestamp: Long = System.currentTimeMillis()
)

@Singleton
class AnalyticsTracker @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val scope = CoroutineScope(Dispatchers.IO)
    
    // In-memory event queue for debugging
    private val eventQueue = mutableListOf<AnalyticsEvent>()
    
    /**
     * Track custom event
     */
    fun trackEvent(eventName: String, parameters: Map<String, Any> = emptyMap()) {
        val event = AnalyticsEvent(eventName, parameters)
        eventQueue.add(event)
        
        scope.launch {
            Firebase.analytics.logEvent(eventName, Bundle().apply {
                parameters.forEach { (key, value) ->
                    when (value) {
                        is String -> putString(key, value)
                        is Int -> putInt(key, value)
                        is Long -> putLong(key, value)
                        is Double -> putDouble(key, value)
                        is Boolean -> putBoolean(key, value)
                    }
                }
            })
            
            println("Analytics: $eventName - $parameters")
        }
    }
    
    /**
     * Track screen view
     */
    fun trackScreenView(screenName: String, screenClass: String? = null) {
        trackEvent("screen_view", mapOf(
            "screen_name" to screenName,
            "screen_class" to (screenClass ?: screenName)
        ))
    }
    
    /**
     * Track user action
     */
    fun trackUserAction(action: String, target: String? = null) {
        trackEvent("user_action", buildMap {
            put("action", action)
            target?.let { put("target", it) }
        })
    }
    
    /**
     * Track purchase
     */
    fun trackPurchase(itemId: String, value: Double, currency: String = "USD") {
        trackEvent("purchase", mapOf(
            "item_id" to itemId,
            "value" to value,
            "currency" to currency
        ))
    }
    
    /**
     * Track search
     */
    fun trackSearch(query: String, results: Int = 0) {
        trackEvent("search", mapOf(
            "search_term" to query,
            "results_count" to results
        ))
    }
    
    /**
     * Track login
     */
    fun trackLogin(method: String) {
        trackEvent("login", mapOf("method" to method))
    }
    
    /**
     * Track signup
     */
    fun trackSignup(method: String) {
        trackEvent("sign_up", mapOf("method" to method))
    }
    
    /**
     * Set user property
     */
    fun setUserProperty(name: String, value: String) {
        scope.launch {
            Firebase.analytics.setUserProperty(name, value)
            println("User Property: $name = $value")
        }
    }
    
    /**
     * Set user ID
     */
    fun setUserId(userId: String) {
        scope.launch {
            Firebase.analytics.setUserId(userId)
            println("User ID: $userId")
        }
    }
    
    /**
     * Get all tracked events (for debugging)
     */
    fun getEvents(): List<AnalyticsEvent> = eventQueue.toList()
    
    /**
     * Clear event queue
     */
    fun clearEvents() {
        eventQueue.clear()
    }
}
