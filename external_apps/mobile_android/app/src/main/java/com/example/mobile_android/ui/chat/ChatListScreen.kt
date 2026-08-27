package com.example.mobile_android.ui.chat

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel

@Composable
fun ChatListScreen(
    onNavigateToRoom: (String) -> Unit,
    viewModel: ChatListViewModel = hiltViewModel()
) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        androidx.compose.material3.Button(onClick = { onNavigateToRoom("general") }) {
            Text("Open General Chat")
        }
    }
}
