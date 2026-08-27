package com.example.mobile_android.data.auth

import android.content.Context
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import javax.inject.Inject
import javax.inject.Singleton

sealed class BiometricResult {
    object Success : BiometricResult()
    data class Error(val code: Int, val message: String) : BiometricResult()
    object Failed : BiometricResult()
    object NotAvailable : BiometricResult()
}

@Singleton
class BiometricAuthManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    
    /**
     * Check if biometric authentication is available
     */
    fun canAuthenticate(): Boolean {
        val biometricManager = BiometricManager.from(context)
        return biometricManager.canAuthenticate(
            BiometricManager.Authenticators.BIOMETRIC_STRONG or 
            BiometricManager.Authenticators.DEVICE_CREDENTIAL
        ) == BiometricManager.BIOMETRIC_SUCCESS
    }
    
    /**
     * Authenticate user
     */
    fun authenticate(
        activity: FragmentActivity,
        title: String = "Biometric Authentication",
        subtitle: String = "Log in using your biometric credential"
    ): Flow<BiometricResult> = callbackFlow {
        if (!canAuthenticate()) {
            trySend(BiometricResult.NotAvailable)
            close()
            return@callbackFlow
        }
        
        val executor = ContextCompat.getMainExecutor(context)
        
        val callback = object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                super.onAuthenticationError(errorCode, errString)
                if (errorCode != BiometricPrompt.ERROR_USER_CANCELED && 
                    errorCode != BiometricPrompt.ERROR_NEGATIVE_BUTTON) {
                    trySend(BiometricResult.Error(errorCode, errString.toString()))
                }
                close()
            }

            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                super.onAuthenticationSucceeded(result)
                trySend(BiometricResult.Success)
                close()
            }

            override fun onAuthenticationFailed() {
                super.onAuthenticationFailed()
                trySend(BiometricResult.Failed)
                // Don't close flow here, user can try again
            }
        }
        
        val biometricPrompt = BiometricPrompt(activity, executor, callback)
        
        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle(title)
            .setSubtitle(subtitle)
            .setAllowedAuthenticators(
                BiometricManager.Authenticators.BIOMETRIC_STRONG or 
                BiometricManager.Authenticators.DEVICE_CREDENTIAL
            )
            .build()
            
        biometricPrompt.authenticate(promptInfo)
        
        awaitClose {
            biometricPrompt.cancelAuthentication()
        }
    }
}
