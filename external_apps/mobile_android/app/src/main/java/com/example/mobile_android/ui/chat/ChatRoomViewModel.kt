package com.example.mobile_android.ui.chat

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.network.SocketManager
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import org.json.JSONObject
import javax.inject.Inject

data class ChatMessage(
    val id: String,
    val text: String,
    val senderId: String,
    val createdAt: Long
)

@HiltViewModel
class ChatRoomViewModel @Inject constructor(
    private val socketManager: SocketManager
) : ViewModel() {

    private val _messages = MutableStateFlow<List<ChatMessage>>(emptyList())
    val messages: StateFlow<List<ChatMessage>> = _messages.asStateFlow()

    fun joinChannel(channelId: String) {
        viewModelScope.launch {
            socketManager.connect()
            val socket = socketManager.getSocket()
            socket?.emit("join_channel", channelId)

            socket?.on("message") { args ->
                if (args.isNotEmpty()) {
                    val data = args[0] as JSONObject
                    val message = ChatMessage(
                        id = System.currentTimeMillis().toString(), // Temp ID
                        text = data.optString("content"),
                        senderId = data.optString("senderId"),
                        createdAt = System.currentTimeMillis()
                    )
                    val currentList = _messages.value.toMutableList()
                    currentList.add(message)
                    _messages.value = currentList
                }
            }
        }
    }

    fun sendMessage(channelId: String, text: String) {
        val socket = socketManager.getSocket()
        val messageData = JSONObject()
        messageData.put("channelId", channelId)
        messageData.put("content", text)
        socket?.emit("message", messageData)
        
        // Optimistic update
        val message = ChatMessage(
            id = System.currentTimeMillis().toString(),
            text = text,
            senderId = "me", // Placeholder
            createdAt = System.currentTimeMillis()
        )
        val currentList = _messages.value.toMutableList()
        currentList.add(message)
        _messages.value = currentList
    }

    override fun onCleared() {
        super.onCleared()
        socketManager.getSocket()?.off("message")
    }
}
