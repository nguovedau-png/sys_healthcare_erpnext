package com.example.mobile_android.ui.media

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.repository.MediaRepository
import com.example.mobile_android.ui.core.UiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MediaViewModel @Inject constructor(
    private val repository: MediaRepository
) : ViewModel() {

    private val _uploadState = MutableStateFlow<UiState<String>>(UiState.Loading) // Initial state can be refined
    val uploadState: StateFlow<UiState<String>> = _uploadState.asStateFlow()

    fun resetState() {
        _uploadState.value = UiState.Success("Ready") // Use a neutral success state or a new Idle state if available
    }

    fun uploadMedia(uri: Uri) {
        _uploadState.value = UiState.Loading
        viewModelScope.launch {
            val result = repository.uploadFile(uri)
            if (result.isSuccess) {
                _uploadState.value = UiState.Success(result.getOrDefault("Upload successful"))
            } else {
                _uploadState.value = UiState.Error(result.exceptionOrNull()?.message ?: "Unknown error")
            }
        }
    }
}
