package com.example.mobile_android.data.auth

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthSessionManager @Inject constructor(
    private val tokenManager: TokenManager
) {
    private val scope = CoroutineScope(Dispatchers.Default + SupervisorJob())
    private var refreshJob: Job? = null
    
    private val _sessionState = MutableStateFlow<SessionState>(SessionState.Active)
    val sessionState: StateFlow<SessionState> = _sessionState
    
    sealed class SessionState {
        object Active : SessionState()
        object Expired : SessionState()
        object RefreshingToken : SessionState()
    }
    
    /**
     * Start monitoring session and auto-refresh tokens
     */
    fun startSession() {
        refreshJob?.cancel()
        refreshJob = scope.launch {
            while (isActive) {
                delay(60_000) // Check every minute
                
                if (tokenManager.isTokenExpired()) {
                    _sessionState.value = SessionState.Expired
                    logout()
                    break
                } else if (tokenManager.shouldRefreshToken()) {
                    refreshToken()
                }
            }
        }
    }
    
    /**
     * Stop session monitoring
     */
    fun stopSession() {
        refreshJob?.cancel()
        refreshJob = null
    }
    
    /**
     * Refresh access token using refresh token
     */
    private suspend fun refreshToken() {
        _sessionState.value = SessionState.RefreshingToken
        
        try {
            val refreshToken = tokenManager.getRefreshToken()
            if (refreshToken != null) {
                // TODO: Call refresh token API
                // val response = authApi.refreshToken(refreshToken)
                // tokenManager.saveTokens(response.accessToken, response.refreshToken, response.expiresIn)
                
                // For now, simulate success
                delay(500)
                _sessionState.value = SessionState.Active
            } else {
                logout()
            }
        } catch (e: Exception) {
            // If refresh fails, logout
            logout()
        }
    }
    
    /**
     * Logout and clear session
     */
    fun logout() {
        stopSession()
        tokenManager.clearTokens()
        _sessionState.value = SessionState.Expired
    }
    
    /**
     * Check if session is active
     */
    fun isSessionActive(): Boolean {
        return tokenManager.hasValidToken()
    }
}
