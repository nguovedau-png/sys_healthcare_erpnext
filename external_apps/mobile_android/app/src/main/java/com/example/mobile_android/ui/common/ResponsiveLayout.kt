package com.example.mobile_android.ui.common

import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.unit.dp

@Composable
fun AdaptiveLayout(
    compactContent: @Composable () -> Unit,
    mediumContent: @Composable (() -> Unit)? = null,
    expandedContent: @Composable (() -> Unit)? = null
) {
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp
    
    when {
        screenWidth < 600.dp -> {
            compactContent()
        }
        screenWidth < 840.dp -> {
            (mediumContent ?: compactContent)()
        }
        else -> {
            (expandedContent ?: mediumContent ?: compactContent)()
        }
    }
}

@Composable
fun isCompactScreen(): Boolean {
    val configuration = LocalConfiguration.current
    return configuration.screenWidthDp < 600
}

@Composable
fun isMediumScreen(): Boolean {
    val configuration = LocalConfiguration.current
    val width = configuration.screenWidthDp
    return width >= 600 && width < 840
}

@Composable
fun isExpandedScreen(): Boolean {
    val configuration = LocalConfiguration.current
    return configuration.screenWidthDp >= 840
}
