package com.example.mobile_android.ui.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.repository.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class TwoFactorViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {

    private val _verificationState = MutableStateFlow<VerificationState>(VerificationState.Idle)
    val verificationState: StateFlow<VerificationState> = _verificationState.asStateFlow()

    fun verify(email: String, tempToken: String, code: String) {
        viewModelScope.launch {
            _verificationState.value = VerificationState.Loading
            val result = authRepository.login(email = email, tempToken = tempToken, code = code)
            result.onSuccess {
                _verificationState.value = VerificationState.Success
            }.onFailure { error ->
                _verificationState.value = VerificationState.Error(error.message ?: "Verification failed")
            }
        }
    }
}

sealed class VerificationState {
    object Idle : VerificationState()
    object Loading : VerificationState()
    object Success : VerificationState()
    data class Error(val message: String) : VerificationState()
}
