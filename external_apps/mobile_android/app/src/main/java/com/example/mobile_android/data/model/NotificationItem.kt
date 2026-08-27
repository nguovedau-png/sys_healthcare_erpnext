package com.example.mobile_android.data.model

data class NotificationItem(
    val id: String,
    val title: String,
    val message: String,
    val timestamp: Long,
    val isRead: Boolean
)
