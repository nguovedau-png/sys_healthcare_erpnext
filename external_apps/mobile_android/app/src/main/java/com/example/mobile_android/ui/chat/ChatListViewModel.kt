package com.example.mobile_android.ui.chat

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.network.SocketManager
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ChatListViewModel @Inject constructor(
    private val socketManager: SocketManager
) : ViewModel() {

    init {
        connectSocket()
    }

    private fun connectSocket() {
        viewModelScope.launch {
            socketManager.connect()
        }
    }

    override fun onCleared() {
        super.onCleared()
        // Don't disconnect here if we want to keep connection alive across screens
        // But for strict lifecycle, maybe disconnect. Let's keep it alive for now.
    }
}
