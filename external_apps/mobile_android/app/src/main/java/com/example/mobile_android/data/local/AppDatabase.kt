package com.example.mobile_android.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.mobile_android.data.local.dao.ItemDao
import com.example.mobile_android.data.local.entities.Item
import com.example.mobile_android.data.local.dao.SyncDao
import com.example.mobile_android.data.local.entities.SyncEntity

@Database(entities = [Item::class, SyncEntity::class], version = 2, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun itemDao(): ItemDao
    abstract fun syncDao(): SyncDao
}
