package com.example.mobile_android.data.notification

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.example.mobile_android.MainActivity
import com.example.mobile_android.R
import com.example.mobile_android.data.notification.NotificationManagerService
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

// Uncomment when Firebase is added
class FCMService : FirebaseMessagingService() {
    
    // Note: Hilt injection in Service requires manual setup
    // For now, use singleton pattern
    private val notificationManager by lazy {
        NotificationManagerService(applicationContext)
    }
    
    companion object {
        private const val CHANNEL_ID = "default_channel"
        private const val CHANNEL_NAME = "Default Notifications"
    }
    
    override fun onNewToken(token: String) {
        super.onNewToken(token)
        // TODO: Send token to server
        notificationManager.saveFCMToken(token)
    }
    
    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        
        // Handle data payload
        message.data.let { data ->
            val type = data["type"]
            val title = data["title"] ?: "New Notification"
            val body = data["body"] ?: ""
            val deepLink = data["deepLink"]
            
            // Save to in-app notifications
            notificationManager.addInAppNotification(
                title = title,
                body = body,
                type = type ?: "default",
                deepLink = deepLink
            )
            
            // Show push notification
            showNotification(title, body, deepLink)
        }
        
        // Handle notification payload
        message.notification?.let { notification ->
            showNotification(
                notification.title ?: "New Notification",
                notification.body ?: "",
                null
            )
        }
    }
    
    private fun showNotification(title: String, body: String, deepLink: String?) {
        createNotificationChannel()
        
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            deepLink?.let { putExtra("deepLink", it) }
        }
        
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            intent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
        
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle(title)
            .setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()
        
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(System.currentTimeMillis().toInt(), notification)
        
        // Update badge count
        this.notificationManager.incrementBadgeCount()
    }
    
    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Default notification channel"
            }
            
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }
}
