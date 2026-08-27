
package com.example.mobile_android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.mobile_android.ui.auth.LoginScreen
import com.example.mobile_android.ui.auth.TwoFactorScreen
import com.example.mobile_android.ui.navigation.Screen
import com.example.mobile_android.ui.theme.Mobile_androidTheme
import dagger.hilt.android.AndroidEntryPoint
import androidx.compose.material3.Text
import androidx.compose.foundation.layout.Box
import androidx.compose.ui.Alignment

import androidx.activity.viewModels
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.example.mobile_android.ui.MainViewModel
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val mainViewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        val splashScreen = installSplashScreen()
        super.onCreate(savedInstanceState)
        
        splashScreen.setKeepOnScreenCondition {
            mainViewModel.isLoading.value
        }

        setContent {
            Mobile_androidTheme {
                val startDestination by mainViewModel.startDestination.collectAsState()
                val isLoading by mainViewModel.isLoading.collectAsState()

                if (!isLoading) {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        color = MaterialTheme.colorScheme.background
                    ) {
                        AppNavigation(startDestination = startDestination)
                    }
                }
            }
        }
    }
}

@Composable
fun AppNavigation(startDestination: String) {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = startDestination) {
        composable(Screen.Login.route) {
            LoginScreen(
                onNavigateToHome = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                },
                onNavigateTo2FA = { tempToken, email ->
                    navController.navigate(Screen.TwoFactor.createRoute(tempToken, email))
                }
            )
        }

        composable(
            route = Screen.TwoFactor.route,
            arguments = listOf(
                navArgument("tempToken") { type = NavType.StringType },
                navArgument("email") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val tempToken = backStackEntry.arguments?.getString("tempToken") ?: ""
            val email = backStackEntry.arguments?.getString("email") ?: ""
            TwoFactorScreen(
                tempToken = tempToken,
                email = email,
                onNavigateToHome = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                }
            )
        }



        composable(Screen.NotificationList.route) {
            // Mock data for now
            val notifications = listOf(
                com.example.mobile_android.data.model.NotificationItem("1", "Welcome", "Welcome to the app!", System.currentTimeMillis(), false),
                com.example.mobile_android.data.model.NotificationItem("2", "System Update", "New features available.", System.currentTimeMillis() - 86400000, true)
            )
            com.example.mobile_android.ui.notification.NotificationScreen(
                notifications = notifications,
                onNotificationClick = { notificationId ->
                    navController.navigate(Screen.NotificationDetail.createRoute(notificationId))
                }
            )
        }

        composable(
            route = Screen.NotificationDetail.route,
            arguments = listOf(androidx.navigation.navArgument("notificationId") { type = NavType.StringType })
        ) { backStackEntry ->
            val notificationId = backStackEntry.arguments?.getString("notificationId")
            // Mock fetching data
            val notification = if (notificationId == "1") {
                com.example.mobile_android.data.model.NotificationItem("1", "Welcome", "Welcome to the app!", System.currentTimeMillis(), false)
            } else {
                 com.example.mobile_android.data.model.NotificationItem("2", "System Update", "New features available.", System.currentTimeMillis() - 86400000, true)
            }
            
            com.example.mobile_android.ui.notification.NotificationDetailScreen(
                notification = notification,
                onBackClick = { navController.popBackStack() }
            )
        }

        composable(Screen.UploadMedia.route) {
            com.example.mobile_android.ui.media.UploadScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }

        composable(Screen.Map.route) {
            com.example.mobile_android.ui.map.MapScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }

        composable(Screen.PaymentSelection.route) {
            com.example.mobile_android.ui.payment.PaymentSelectionScreen(
                onNavigateBack = { navController.popBackStack() },
                onNavigateHistory = { navController.navigate(Screen.TransactionHistory.route) }
            )
        }

        composable(Screen.TransactionHistory.route) {
            com.example.mobile_android.ui.payment.TransactionHistoryScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }
    }
}

@Composable
fun HomeScreen() {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Home Dashboard")
    }
}