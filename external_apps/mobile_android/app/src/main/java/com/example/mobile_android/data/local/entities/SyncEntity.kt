package com.example.mobile_android.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "sync_queue")
data class SyncEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val endpoint: String,
    val method: String, // POST, PUT, DELETE
    val payload: String, // JSON payload
    val timestamp: Long = System.currentTimeMillis(),
    val retryCount: Int = 0
)
