package com.example.mobile_android.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

@Composable
fun DrawerContent(
    currentRoute: String = "",
    onNavigate: (String) -> Unit,
    onCloseDrawer: () -> Unit
) {
    ModalDrawerSheet {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(vertical = 16.dp)
        ) {
            // Header
            DrawerHeader()
            
            Divider(modifier = Modifier.padding(vertical = 8.dp))
            
            // Menu Items
            DrawerMenuItem(
                icon = Icons.Default.Home,
                label = "Home",
                isSelected = currentRoute == "home",
                onClick = {
                    onNavigate("home")
                    onCloseDrawer()
                }
            )
            
            DrawerMenuItem(
                icon = Icons.Default.Notifications,
                label = "Notifications",
                isSelected = currentRoute == "notifications",
                onClick = {
                    onNavigate("notifications")
                    onCloseDrawer()
                }
            )
            
            DrawerMenuItem(
                icon = Icons.Default.LocationOn,
                label = "Map & Routes",
                isSelected = currentRoute == "map",
                onClick = {
                    onNavigate("map")
                    onCloseDrawer()
                }
            )
            
            DrawerMenuItem(
                icon = Icons.Default.CreditCard,
                label = "Payments",
                isSelected = currentRoute == "payments",
                onClick = {
                    onNavigate("payments")
                    onCloseDrawer()
                }
            )
            
            Divider(modifier = Modifier.padding(vertical = 8.dp))
            
            DrawerMenuItem(
                icon = Icons.Default.Settings,
                label = "Settings",
                isSelected = currentRoute == "settings",
                onClick = {
                    onNavigate("settings")
                    onCloseDrawer()
                }
            )
            
            DrawerMenuItem(
                icon = Icons.Default.Info,
                label = "About",
                isSelected = currentRoute == "about",
                onClick = {
                    onNavigate("about")
                    onCloseDrawer()
                }
            )
        }
    }
}

@Composable
private fun DrawerHeader() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 24.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(64.dp)
                .clip(CircleShape)
                .background(MaterialTheme.colorScheme.primaryContainer),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Person,
                contentDescription = null,
                modifier = Modifier.size(32.dp),
                tint = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }
        
        Spacer(modifier = Modifier.width(16.dp))
        
        Column {
            Text(
                text = "John Doe",
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onSurface
            )
            Text(
                text = "john.doe@example.com",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
private fun DrawerMenuItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    isSelected: Boolean = false,
    onClick: () -> Unit
) {
    val backgroundColor = if (isSelected) {
        MaterialTheme.colorScheme.secondaryContainer
    } else {
        MaterialTheme.colorScheme.surface
    }
    
    val contentColor = if (isSelected) {
        MaterialTheme.colorScheme.onSecondaryContainer
    } else {
        MaterialTheme.colorScheme.onSurface
    }
    
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .background(backgroundColor)
            .padding(horizontal = 16.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = contentColor
        )
        
        Spacer(modifier = Modifier.width(16.dp))
        
        Text(
            text = label,
            style = MaterialTheme.typography.bodyLarge,
            color = contentColor
        )
    }
}
