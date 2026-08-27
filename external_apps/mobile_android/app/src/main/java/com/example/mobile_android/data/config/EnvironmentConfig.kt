package com.example.mobile_android.data.config

import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

enum class Environment {
    DEV, STAGING, PROD
}

@Singleton
class EnvironmentConfig @Inject constructor(
    @ApplicationContext private val context: Context
) {
    
    // Current environment (change based on build variant)
    private var currentEnvironment: Environment = Environment.DEV
    
    companion object {
        // API URLs for each environment
        private const val DEV_API_URL = "https://dev-api.example.com"
        private const val STAGING_API_URL = "https://staging-api.example.com"
        private const val PROD_API_URL = "https://api.example.com"
        
        // WebSocket URLs
        private const val DEV_WS_URL = "wss://dev-ws.example.com"
        private const val STAGING_WS_URL = "wss://staging-ws.example.com"
        private const val PROD_WS_URL = "wss://ws.example.com"
    }
    
    /**
     * Set current environment
     */
    fun setEnvironment(environment: Environment) {
        currentEnvironment = environment
    }
    
    /**
     * Get current environment
     */
    fun getEnvironment(): Environment = currentEnvironment
    
    /**
     * Get API base URL for current environment
     */
    fun getApiUrl(): String {
        return when (currentEnvironment) {
            Environment.DEV -> DEV_API_URL
            Environment.STAGING -> STAGING_API_URL
            Environment.PROD -> PROD_API_URL
        }
    }
    
    /**
     * Get WebSocket URL for current environment
     */
    fun getWebSocketUrl(): String {
        return when (currentEnvironment) {
            Environment.DEV -> DEV_WS_URL
            Environment.STAGING -> STAGING_WS_URL
            Environment.PROD -> PROD_WS_URL
        }
    }
    
    /**
     * Check if current environment is production
     */
    fun isProduction(): Boolean = currentEnvironment == Environment.PROD
    
    /**
     * Check if current environment is development
     */
    fun isDevelopment(): Boolean = currentEnvironment == Environment.DEV
    
    /**
     * Check if current environment is staging
     */
    fun isStaging(): Boolean = currentEnvironment == Environment.STAGING
    
    /**
     * Check if debug mode is enabled
     */
    fun isDebugMode(): Boolean = !isProduction()
    
    /**
     * Get environment name
     */
    fun getEnvironmentName(): String = currentEnvironment.name
    
    /**
     * Get all configuration as map
     */
    fun getConfig(): Map<String, String> {
        return mapOf(
            "environment" to getEnvironmentName(),
            "api_url" to getApiUrl(),
            "ws_url" to getWebSocketUrl(),
            "debug_mode" to isDebugMode().toString()
        )
    }
}
