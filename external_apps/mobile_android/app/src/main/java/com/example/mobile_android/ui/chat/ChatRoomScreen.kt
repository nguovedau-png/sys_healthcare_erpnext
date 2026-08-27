package com.example.mobile_android.ui.chat

import androidx.compose.foundation.layout.*
import androidx.compose.ui.res.stringResource
import com.example.mobile_android.R
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel

@Composable
fun ChatRoomScreen(
    channelId: String,
    viewModel: ChatRoomViewModel = hiltViewModel()
) {
    var text by remember { mutableStateOf("") }
    val messages by viewModel.messages.collectAsState()

    LaunchedEffect(channelId) {
        viewModel.joinChannel(channelId)
    }

    Column(modifier = Modifier.fillMaxSize()) {
        LazyColumn(
            modifier = Modifier.weight(1f).padding(8.dp),
            reverseLayout = true 
        ) {
            items(messages.reversed()) { message ->
                Text(text = "${message.senderId}: ${message.text}")
                Spacer(modifier = Modifier.height(4.dp))
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextField(
                value = text,
                onValueChange = { text = it },
                modifier = Modifier.weight(1f),
                placeholder = { Text(stringResource(R.string.type_message_placeholder)) }
            )
            IconButton(onClick = {
                if (text.isNotBlank()) {
                    viewModel.sendMessage(channelId, text)
                    text = ""
                }
            }) {
                Icon(Icons.Default.Send, contentDescription = stringResource(R.string.send_button_desc))
            }
        }
    }
}
