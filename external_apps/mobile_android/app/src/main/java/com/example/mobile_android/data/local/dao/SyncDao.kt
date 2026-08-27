package com.example.mobile_android.data.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.mobile_android.data.local.entities.SyncEntity

@Dao
interface SyncDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(syncEntity: SyncEntity)

    @Delete
    suspend fun delete(syncEntity: SyncEntity)

    @Query("SELECT * FROM sync_queue ORDER BY timestamp ASC")
    suspend fun getAll(): List<SyncEntity>
    
    @Query("DELETE FROM sync_queue WHERE id = :id")
    suspend fun deleteById(id: Long)
}
