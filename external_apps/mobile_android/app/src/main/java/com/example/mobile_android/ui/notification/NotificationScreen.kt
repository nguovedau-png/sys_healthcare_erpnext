package com.example.mobile_android.ui.notification

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.mobile_android.data.model.NotificationItem
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun NotificationScreen(
    notifications: List<NotificationItem>,
    onNotificationClick: (String) -> Unit
) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp)
    ) {
        items(notifications) { notification ->
            NotificationItemRow(notification = notification, onClick = { onNotificationClick(notification.id) })
            HorizontalDivider()
        }
    }
}

@Composable
fun NotificationItemRow(
    notification: NotificationItem,
    onClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(vertical = 12.dp)
    ) {
        Text(
            text = notification.title,
            style = MaterialTheme.typography.titleMedium,
            color = if (notification.isRead) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.onSurface
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = notification.message,
            style = MaterialTheme.typography.bodyMedium,
            maxLines = 2
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault()).format(Date(notification.timestamp)),
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.secondary
        )
    }
}
