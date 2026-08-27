package com.example.mobile_android.ui.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.auth.SocialAuthManager
import com.example.mobile_android.data.repository.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject
import android.app.Activity

@HiltViewModel
class LoginViewModel @Inject constructor(
    private val authRepository: AuthRepository,
    private val socialAuthManager: SocialAuthManager
) : ViewModel() {

    private val _loginState = MutableStateFlow<LoginState>(LoginState.Idle)
    val loginState: StateFlow<LoginState> = _loginState.asStateFlow()

    fun login(email: String, password: String) {
        viewModelScope.launch {
            _loginState.value = LoginState.Loading
            val result = authRepository.login(email, password)
            handleLoginResult(result)
        }
    }

    fun loginWithGoogle(activity: Activity) {
        viewModelScope.launch {
            _loginState.value = LoginState.Loading
            socialAuthManager.signInWithGoogle(activity)
            // Listen to authResult flow in UI or here if manager exposes it effectively
            // For simplicity, assuming manager updates its own state which we should observe or it returns result
        }
    }

    fun loginWithFacebook(activity: Activity) {
        viewModelScope.launch {
            _loginState.value = LoginState.Loading
            socialAuthManager.signInWithFacebook(activity)
        }
    }

    fun loginWithApple(activity: Activity) {
        viewModelScope.launch {
            _loginState.value = LoginState.Loading
            socialAuthManager.signInWithApple(activity)
        }
    }

    private fun handleLoginResult(result: Result<com.example.mobile_android.data.model.AuthResponse>) {
        result.onSuccess { response ->
            if (response.data?.require2FA == true) {
                _loginState.value = LoginState.NavigateTo2FA(response.data.tempToken ?: "", response.data.user?.email ?: "")
            } else {
                _loginState.value = LoginState.Success
            }
        }.onFailure { error ->
            _loginState.value = LoginState.Error(error.message ?: "Unknown error")
        }
    }
}

sealed class LoginState {
    object Idle : LoginState()
    object Loading : LoginState()
    object Success : LoginState()
    data class NavigateTo2FA(val tempToken: String, val email: String) : LoginState()
    data class Error(val message: String) : LoginState()
}
