package com.example.mobile_android.data.notification

import android.content.Context
import android.content.SharedPreferences
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import javax.inject.Inject
import javax.inject.Singleton

data class InAppNotification(
    val id: String = System.currentTimeMillis().toString(),
    val title: String,
    val body: String,
    val type: String,
    val deepLink: String? = null,
    val timestamp: Long = System.currentTimeMillis(),
    val isRead: Boolean = false
)

@Singleton
class NotificationManagerService @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val prefs: SharedPreferences = context.getSharedPreferences("notifications", Context.MODE_PRIVATE)
    
    private val _notifications = MutableStateFlow<List<InAppNotification>>(emptyList())
    val notifications: StateFlow<List<InAppNotification>> = _notifications
    
    private val _badgeCount = MutableStateFlow(0)
    val badgeCount: StateFlow<Int> = _badgeCount
    
    companion object {
        private const val KEY_FCM_TOKEN = "fcm_token"
        private const val KEY_BADGE_COUNT = "badge_count"
    }
    
    init {
        loadBadgeCount()
    }
    
    fun saveFCMToken(token: String) {
        prefs.edit().putString(KEY_FCM_TOKEN, token).apply()
    }
    
    fun getFCMToken(): String? {
        return prefs.getString(KEY_FCM_TOKEN, null)
    }
    
    fun addInAppNotification(title: String, body: String, type: String, deepLink: String? = null) {
        val notification = InAppNotification(
            title = title,
            body = body,
            type = type,
            deepLink = deepLink
        )
        _notifications.value = listOf(notification) + _notifications.value
    }
    
    fun markAsRead(notificationId: String) {
        _notifications.value = _notifications.value.map {
            if (it.id == notificationId) it.copy(isRead = true) else it
        }
        decrementBadgeCount()
    }
    
    fun markAllAsRead() {
        _notifications.value = _notifications.value.map { it.copy(isRead = true) }
        clearBadgeCount()
    }
    
    fun deleteNotification(notificationId: String) {
        val notification = _notifications.value.find { it.id == notificationId }
        _notifications.value = _notifications.value.filter { it.id != notificationId }
        if (notification?.isRead == false) {
            decrementBadgeCount()
        }
    }
    
    fun clearAll() {
        _notifications.value = emptyList()
        clearBadgeCount()
    }
    
    fun incrementBadgeCount() {
        _badgeCount.value += 1
        saveBadgeCount()
    }
    
    fun decrementBadgeCount() {
        if (_badgeCount.value > 0) {
            _badgeCount.value -= 1
            saveBadgeCount()
        }
    }
    
    fun clearBadgeCount() {
        _badgeCount.value = 0
        saveBadgeCount()
    }
    
    private fun saveBadgeCount() {
        prefs.edit().putInt(KEY_BADGE_COUNT, _badgeCount.value).apply()
    }
    
    private fun loadBadgeCount() {
        _badgeCount.value = prefs.getInt(KEY_BADGE_COUNT, 0)
    }
    
    fun getUnreadCount(): Int {
        return _notifications.value.count { !it.isRead }
    }
}
