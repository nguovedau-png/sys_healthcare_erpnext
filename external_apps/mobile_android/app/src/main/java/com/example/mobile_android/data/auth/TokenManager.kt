package com.example.mobile_android.data.auth

import android.content.Context
import android.content.SharedPreferences
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TokenManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val prefs: SharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    
    private val _isAuthenticated = MutableStateFlow(hasValidToken())
    val isAuthenticated: StateFlow<Boolean> = _isAuthenticated
    
    companion object {
        private const val PREFS_NAME = "auth_prefs"
        private const val KEY_ACCESS_TOKEN = "access_token"
        private const val KEY_REFRESH_TOKEN = "refresh_token"
        private const val KEY_TOKEN_EXPIRY = "token_expiry"
        private const val KEY_USER_ID = "user_id"
    }
    
    fun saveTokens(accessToken: String, refreshToken: String, expiresIn: Long = 3600) {
        val expiryTime = System.currentTimeMillis() + (expiresIn * 1000)
        prefs.edit().apply {
            putString(KEY_ACCESS_TOKEN, accessToken)
            putString(KEY_REFRESH_TOKEN, refreshToken)
            putLong(KEY_TOKEN_EXPIRY, expiryTime)
            apply()
        }
        _isAuthenticated.value = true
    }
    
    fun getAccessToken(): String? {
        return prefs.getString(KEY_ACCESS_TOKEN, null)
    }
    
    fun getRefreshToken(): String? {
        return prefs.getString(KEY_REFRESH_TOKEN, null)
    }
    
    fun isTokenExpired(): Boolean {
        val expiryTime = prefs.getLong(KEY_TOKEN_EXPIRY, 0)
        return System.currentTimeMillis() >= expiryTime
    }
    
    fun hasValidToken(): Boolean {
        val token = getAccessToken()
        return !token.isNullOrEmpty() && !isTokenExpired()
    }
    
    fun clearTokens() {
        prefs.edit().apply {
            remove(KEY_ACCESS_TOKEN)
            remove(KEY_REFRESH_TOKEN)
            remove(KEY_TOKEN_EXPIRY)
            remove(KEY_USER_ID)
            apply()
        }
        _isAuthenticated.value = false
    }
    
    fun saveUserId(userId: String) {
        prefs.edit().putString(KEY_USER_ID, userId).apply()
    }
    
    fun getUserId(): String? {
        return prefs.getString(KEY_USER_ID, null)
    }
    
    /**
     * Check if token needs refresh (expires in less than 5 minutes)
     */
    fun shouldRefreshToken(): Boolean {
        val expiryTime = prefs.getLong(KEY_TOKEN_EXPIRY, 0)
        val fiveMinutesFromNow = System.currentTimeMillis() + (5 * 60 * 1000)
        return fiveMinutesFromNow >= expiryTime
    }
    
    /**
     * Get time until token expires in seconds
     */
    fun getTimeUntilExpiry(): Long {
        val expiryTime = prefs.getLong(KEY_TOKEN_EXPIRY, 0)
        val timeLeft = expiryTime - System.currentTimeMillis()
        return if (timeLeft > 0) timeLeft / 1000 else 0
    }
}
