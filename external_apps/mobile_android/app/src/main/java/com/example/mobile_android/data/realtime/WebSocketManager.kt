package com.example.mobile_android.data.realtime

import io.socket.client.IO
import io.socket.client.Socket
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import org.json.JSONObject
import javax.inject.Inject
import javax.inject.Singleton

sealed class ConnectionState {
    object Disconnected : ConnectionState()
    object Connecting : ConnectionState()
    object Connected : ConnectionState()
    data class Error(val message: String) : ConnectionState()
}

@Singleton
class WebSocketManager @Inject constructor() {
    
    private var socket: Socket? = null
    
    private val _connectionState = MutableStateFlow<ConnectionState>(ConnectionState.Disconnected)
    val connectionState: StateFlow<ConnectionState> = _connectionState
    
    private val eventListeners = mutableMapOf<String, MutableList<(JSONObject) -> Unit>>()
    
    fun connect(url: String, token: String? = null) {
        try {
            _connectionState.value = ConnectionState.Connecting
            
            val options = IO.Options().apply {
                reconnection = true
                reconnectionAttempts = 5
                reconnectionDelay = 1000
                token?.let {
                    auth = mapOf("token" to it)
                }
            }
            
            socket = IO.socket(url, options)
            
            socket?.apply {
                on(Socket.EVENT_CONNECT) {
                    _connectionState.value = ConnectionState.Connected
                }
                
                on(Socket.EVENT_DISCONNECT) {
                    _connectionState.value = ConnectionState.Disconnected
                }
                
                on(Socket.EVENT_CONNECT_ERROR) { args ->
                    val error = args.firstOrNull()?.toString() ?: "Connection error"
                    _connectionState.value = ConnectionState.Error(error)
                }
                
                connect()
            }
        } catch (e: Exception) {
            _connectionState.value = ConnectionState.Error(e.message ?: "Unknown error")
        }
    }
    
    fun disconnect() {
        socket?.disconnect()
        socket = null
        _connectionState.value = ConnectionState.Disconnected
    }
    
    fun on(event: String, callback: (JSONObject) -> Unit) {
        socket?.on(event) { args ->
            val data = args.firstOrNull() as? JSONObject ?: JSONObject()
            callback(data)
        }
        
        // Store listener for cleanup
        eventListeners.getOrPut(event) { mutableListOf() }.add(callback)
    }
    
    fun off(event: String) {
        socket?.off(event)
        eventListeners.remove(event)
    }
    
    fun emit(event: String, data: JSONObject) {
        socket?.emit(event, data)
    }
    
    fun isConnected(): Boolean {
        return socket?.connected() == true
    }
    
    // Common event handlers
    fun onMessage(callback: (JSONObject) -> Unit) {
        on("message", callback)
    }
    
    fun onNotification(callback: (JSONObject) -> Unit) {
        on("notification", callback)
    }
    
    fun onUserStatusChange(callback: (JSONObject) -> Unit) {
        on("user_status", callback)
    }
    
    fun sendMessage(message: String, recipientId: String) {
        val data = JSONObject().apply {
            put("message", message)
            put("recipientId", recipientId)
            put("timestamp", System.currentTimeMillis())
        }
        emit("send_message", data)
    }
}
