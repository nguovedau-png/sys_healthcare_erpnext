package com.example.mobile_android.data.repository

import com.example.mobile_android.data.local.TokenManager
import com.example.mobile_android.data.network.ApiService
import com.example.mobile_android.data.network.LoginResponse
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepository @Inject constructor(
    private val apiService: ApiService,
    private val tokenManager: TokenManager
) {
    suspend fun login(email: String, password: String = "", code: String? = null, tempToken: String? = null): Result<LoginResponse> {
        return try {
            val body = mutableMapOf(
                "email" to email
            )
            if (password.isNotEmpty()) body["password"] = password
            if (code != null) body["code"] = code
            if (tempToken != null) body["tempToken"] = tempToken

            val response = apiService.login(body)
            if (response.isSuccessful && response.body() != null) {
                val loginResponse = response.body()!!
                if (loginResponse.success && loginResponse.data != null) {
                    if (loginResponse.data.accessToken.isNotEmpty()) {
                        tokenManager.saveTokens(
                            loginResponse.data.accessToken,
                            loginResponse.data.refreshToken
                        )
                        tokenManager.saveUserId(loginResponse.data.user.id)
                    }
                    Result.success(loginResponse)
                } else {
                    Result.failure(Exception(loginResponse.message ?: "Login failed"))
                }
            } else {
                Result.failure(Exception("Login failed: ${response.code()}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun clearSession() {
        tokenManager.clearTokens()
    }
}
