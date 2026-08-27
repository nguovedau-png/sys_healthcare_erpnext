package com.example.mobile_android.data.notification

import android.content.Intent
import android.net.Uri
import androidx.navigation.NavController
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class DeepLinkHandler @Inject constructor() {
    
    fun handleDeepLink(deepLink: String?, navController: NavController) {
        if (deepLink.isNullOrEmpty()) return
        
        try {
            val uri = Uri.parse(deepLink)
            when (uri.host) {
                "profile" -> {
                    val userId = uri.getQueryParameter("userId")
                    navController.navigate("profile/$userId")
                }
                "chat" -> {
                    val chatId = uri.getQueryParameter("chatId")
                    navController.navigate("chat/$chatId")
                }
                "notification" -> {
                    val notificationId = uri.getQueryParameter("id")
                    navController.navigate("notification/$notificationId")
                }
                "payment" -> {
                    val invoiceId = uri.getQueryParameter("invoiceId")
                    navController.navigate("payment/invoice/$invoiceId")
                }
                else -> {
                    // Navigate to home or handle unknown deep link
                    navController.navigate("home")
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    fun handleIntent(intent: Intent?, navController: NavController) {
        intent?.getStringExtra("deepLink")?.let { deepLink ->
            handleDeepLink(deepLink, navController)
        }
    }
    
    companion object {
        // Deep link builders
        fun buildProfileLink(userId: String): String {
            return "myapp://profile?userId=$userId"
        }
        
        fun buildChatLink(chatId: String): String {
            return "myapp://chat?chatId=$chatId"
        }
        
        fun buildNotificationLink(notificationId: String): String {
            return "myapp://notification?id=$notificationId"
        }
        
        fun buildPaymentLink(invoiceId: String): String {
            return "myapp://payment?invoiceId=$invoiceId"
        }
    }
}
