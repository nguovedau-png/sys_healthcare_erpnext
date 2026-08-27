package com.example.mobile_android.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.network.ApiService
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class UserProfile(
    val id: String,
    val email: String,
    val fullName: String,
    val role: String
)

sealed class ProfileState {
    object Loading : ProfileState()
    data class Success(val profile: UserProfile) : ProfileState()
    data class Error(val message: String) : ProfileState()
}

import com.example.mobile_android.data.profile.AvatarManager
import javax.inject.Inject
import android.net.Uri
import java.io.File

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val apiService: ApiService,
    private val avatarManager: AvatarManager
) : ViewModel() {

    private val _state = MutableStateFlow<ProfileState>(ProfileState.Loading)
    val state: StateFlow<ProfileState> = _state.asStateFlow()

    init {
        loadProfile()
    }

    fun loadProfile() {
        viewModelScope.launch {
            _state.value = ProfileState.Loading
            try {
                val response = apiService.getCurrentUser()
                if (response.isSuccessful && response.body()?.success == true && response.body()?.data != null) {
                    val user = response.body()!!.data!!
                    _state.value = ProfileState.Success(
                        UserProfile(
                            id = user.id,
                            email = user.email,
                            fullName = user.fullName,
                            role = user.role
                        )
                    )
                } else {
                    _state.value = ProfileState.Error("Failed to load profile")
                }
            } catch (e: Exception) {
                _state.value = ProfileState.Error(e.message ?: "Unknown error")
            }
        }
    }

    fun uploadAvatar(uri: Uri) {
        viewModelScope.launch {
            val file = avatarManager.processAvatar(uri)
            if (file != null) {
                val result = avatarManager.uploadAvatar(file)
                if (result.isSuccess) {
                    // Refresh profile to show new avatar
                    loadProfile()
                } else {
                    _state.value = ProfileState.Error("Failed to upload avatar")
                }
            } else {
                _state.value = ProfileState.Error("Failed to process image")
            }
        }
    }
}
