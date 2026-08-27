package com.example.mobile_android.data.network

object ApiConfig {
    // 10.0.2.2 is the special alias to your host loopback interface (i.e., 127.0.0.1 on your development machine)
    // Use your machine's local IP address if testing on a physical device.
    private const val BASE_URL_HOST = "http://10.0.2.2:3000" 
    
    const val API_BASE_URL = "$BASE_URL_HOST/api/v1/"
    const val SOCKET_URL = BASE_URL_HOST
}
