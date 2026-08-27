package com.example.mobile_android.data.config

import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Remote Config Manager
 * 
 * Note: Integrate with Firebase Remote Config
 * 
 * Add to build.gradle:
 * implementation("com.google.firebase:firebase-config-ktx")
 */

@Singleton
class RemoteConfigManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    
    private val _config = MutableStateFlow<Map<String, Any>>(getDefaultConfig())
    val config: StateFlow<Map<String, Any>> = _config
    
    companion object {
        // Default config values
        private const val DEFAULT_API_TIMEOUT = 30000L
        private const val DEFAULT_MAX_RETRIES = 3
        private const val DEFAULT_CACHE_TTL = 3600L
    }
    
    /**
     * Get default configuration
     */
    private fun getDefaultConfig(): Map<String, Any> {
        return mapOf(
            "api_timeout" to DEFAULT_API_TIMEOUT,
            "max_retries" to DEFAULT_MAX_RETRIES,
            "cache_ttl" to DEFAULT_CACHE_TTL,
            "enable_analytics" to true,
            "enable_crash_reporting" to true,
            "min_app_version" to "1.0.0",
            "force_update_version" to "1.0.0",
            "maintenance_mode" to false,
            "maintenance_message" to "App is under maintenance"
        )
    }
    
    /**
     * Fetch remote config from server
     */
    suspend fun fetchConfig() {
        // TODO: Fetch from Firebase Remote Config
        // val remoteConfig = Firebase.remoteConfig
        // remoteConfig.fetchAndActivate().await()
        
        // For now, use default config
        _config.value = getDefaultConfig()
    }
    
    /**
     * Get string value
     */
    fun getString(key: String, defaultValue: String = ""): String {
        return _config.value[key] as? String ?: defaultValue
    }
    
    /**
     * Get boolean value
     */
    fun getBoolean(key: String, defaultValue: Boolean = false): Boolean {
        return _config.value[key] as? Boolean ?: defaultValue
    }
    
    /**
     * Get long value
     */
    fun getLong(key: String, defaultValue: Long = 0L): Long {
        return when (val value = _config.value[key]) {
            is Long -> value
            is Int -> value.toLong()
            else -> defaultValue
        }
    }
    
    /**
     * Get double value
     */
    fun getDouble(key: String, defaultValue: Double = 0.0): Double {
        return when (val value = _config.value[key]) {
            is Double -> value
            is Float -> value.toDouble()
            else -> defaultValue
        }
    }
    
    /**
     * Get all config values
     */
    fun getAllConfig(): Map<String, Any> = _config.value
    
    /**
     * Check if maintenance mode is enabled
     */
    fun isMaintenanceMode(): Boolean {
        return getBoolean("maintenance_mode", false)
    }
    
    /**
     * Get maintenance message
     */
    fun getMaintenanceMessage(): String {
        return getString("maintenance_message", "App is under maintenance")
    }
    
    /**
     * Get API timeout
     */
    fun getApiTimeout(): Long {
        return getLong("api_timeout", DEFAULT_API_TIMEOUT)
    }
    
    /**
     * Get max retries
     */
    fun getMaxRetries(): Int {
        return getLong("max_retries", DEFAULT_MAX_RETRIES.toLong()).toInt()
    }
}
