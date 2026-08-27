package com.example.mobile_android.data.network

import android.content.Context
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class CacheManager @Inject constructor(
    @ApplicationContext private val context: Context,
    private val gson: Gson
) {
    private val cacheDir = File(context.cacheDir, "api_cache")
    
    init {
        if (!cacheDir.exists()) {
            cacheDir.mkdirs()
        }
    }
    
    /**
     * Save data to cache
     */
    suspend fun <T> save(key: String, data: T, ttlMinutes: Long = 60) = withContext(Dispatchers.IO) {
        try {
            val cacheFile = File(cacheDir, key.hashCode().toString())
            val cacheData = CacheData(
                data = gson.toJson(data),
                timestamp = System.currentTimeMillis(),
                ttl = TimeUnit.MINUTES.toMillis(ttlMinutes)
            )
            cacheFile.writeText(gson.toJson(cacheData))
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    /**
     * Get data from cache
     */
    suspend fun <T> get(key: String, type: Class<T>): T? = withContext(Dispatchers.IO) {
        try {
            val cacheFile = File(cacheDir, key.hashCode().toString())
            if (!cacheFile.exists()) return@withContext null
            
            val cacheDataJson = cacheFile.readText()
            val cacheData = gson.fromJson(cacheDataJson, CacheData::class.java)
            
            // Check if cache is expired
            if (System.currentTimeMillis() - cacheData.timestamp > cacheData.ttl) {
                cacheFile.delete()
                return@withContext null
            }
            
            gson.fromJson(cacheData.data, type)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
    
    /**
     * Get list data from cache
     */
    suspend fun <T> getList(key: String, type: Class<T>): List<T>? = withContext(Dispatchers.IO) {
        try {
            val cacheFile = File(cacheDir, key.hashCode().toString())
            if (!cacheFile.exists()) return@withContext null
            
            val cacheDataJson = cacheFile.readText()
            val cacheData = gson.fromJson(cacheDataJson, CacheData::class.java)
            
            // Check if cache is expired
            if (System.currentTimeMillis() - cacheData.timestamp > cacheData.ttl) {
                cacheFile.delete()
                return@withContext null
            }
            
            val listType = TypeToken.getParameterized(List::class.java, type).type
            gson.fromJson(cacheData.data, listType)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
    
    /**
     * Clear specific cache
     */
    suspend fun clear(key: String) = withContext(Dispatchers.IO) {
        try {
            val cacheFile = File(cacheDir, key.hashCode().toString())
            if (cacheFile.exists()) {
                cacheFile.delete()
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    /**
     * Clear all cache
     */
    suspend fun clearAll() = withContext(Dispatchers.IO) {
        try {
            cacheDir.listFiles()?.forEach { it.delete() }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    /**
     * Check if cache exists and is valid
     */
    suspend fun isValid(key: String): Boolean = withContext(Dispatchers.IO) {
        try {
            val cacheFile = File(cacheDir, key.hashCode().toString())
            if (!cacheFile.exists()) return@withContext false
            
            val cacheDataJson = cacheFile.readText()
            val cacheData = gson.fromJson(cacheDataJson, CacheData::class.java)
            
            System.currentTimeMillis() - cacheData.timestamp <= cacheData.ttl
        } catch (e: Exception) {
            false
        }
    }
    
    private data class CacheData(
        val data: String,
        val timestamp: Long,
        val ttl: Long
    )
}
