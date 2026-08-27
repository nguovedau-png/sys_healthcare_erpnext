package com.example.mobile_android.data.network

import kotlinx.coroutines.delay
import okhttp3.Interceptor
import okhttp3.Response
import java.io.IOException
import java.net.SocketTimeoutException
import java.net.UnknownHostException
import javax.inject.Inject

class RetryInterceptor @Inject constructor() : Interceptor {
    
    companion object {
        private const val MAX_RETRIES = 3
        private const val INITIAL_BACKOFF_MS = 1000L
    }
    
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        var response: Response? = null
        var exception: IOException? = null
        
        repeat(MAX_RETRIES) { attempt ->
            try {
                response?.close() // Close previous response if exists
                response = chain.proceed(request)
                
                // If successful, return response
                if (response!!.isSuccessful) {
                    return response!!
                }
                
                // If server error (5xx), retry
                if (response!!.code in 500..599) {
                    if (attempt < MAX_RETRIES - 1) {
                        Thread.sleep(calculateBackoff(attempt))
                    }
                } else {
                    // Client error (4xx), don't retry
                    return response!!
                }
                
            } catch (e: IOException) {
                exception = e
                
                // Only retry on network errors
                if (shouldRetry(e) && attempt < MAX_RETRIES - 1) {
                    Thread.sleep(calculateBackoff(attempt))
                } else {
                    throw e
                }
            }
        }
        
        // If all retries failed, throw exception or return last response
        exception?.let { throw it }
        return response ?: throw IOException("Max retries exceeded")
    }
    
    private fun shouldRetry(exception: IOException): Boolean {
        return when (exception) {
            is SocketTimeoutException,
            is UnknownHostException -> true
            else -> false
        }
    }
    
    private fun calculateBackoff(attempt: Int): Long {
        return INITIAL_BACKOFF_MS * (1 shl attempt) // Exponential backoff: 1s, 2s, 4s
    }
}
