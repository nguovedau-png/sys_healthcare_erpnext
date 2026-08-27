package com.example.mobile_android.data.network

import android.util.Log
import com.example.mobile_android.data.local.TokenManager
import io.socket.client.IO
import io.socket.client.Socket
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SocketManager @Inject constructor(
    private val tokenManager: TokenManager
) {
    private var socket: Socket? = null

    suspend fun connect() {
        if (socket?.connected() == true) return

        val token = tokenManager.accessToken.first()
        if (token.isNullOrEmpty()) return

        try {
            val opts = IO.Options()
            opts.auth = mapOf("token" to token)
            opts.forceNew = true
            
            socket = IO.socket(ApiConfig.SOCKET_URL, opts)
            
            socket?.on(Socket.EVENT_CONNECT) {
                Log.d("SocketManager", "Connected")
            }
            
            socket?.on(Socket.EVENT_DISCONNECT) {
                Log.d("SocketManager", "Disconnected")
            }
            
            socket?.on(Socket.EVENT_CONNECT_ERROR) {
                Log.e("SocketManager", "Connect Error: ${it[0]}")
            }

            socket?.connect()
        } catch (e: Exception) {
            Log.e("SocketManager", "Error connecting", e)
        }
    }

    fun disconnect() {
        socket?.disconnect()
        socket = null
    }

    fun getSocket(): Socket? = socket
}
