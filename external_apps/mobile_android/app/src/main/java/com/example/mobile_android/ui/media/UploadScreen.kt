package com.example.mobile_android.ui.media

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.mobile_android.ui.core.UiState

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UploadScreen(
    onNavigateBack: () -> Unit,
    viewModel: MediaViewModel = hiltViewModel()
) {
    val context = LocalContext.current
    val uploadState by viewModel.uploadState.collectAsState()
    var selectedUri by remember { mutableStateOf<Uri?>(null) }

    // Photo Picker Launcher
    val pickMedia = rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
        if (uri != null) {
            selectedUri = uri
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Upload Media") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Button(
                onClick = {
                    pickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageAndVideo))
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Select Image or Video")
            }

            Spacer(modifier = Modifier.height(16.dp))

            if (selectedUri != null) {
                Text("Selected: ${selectedUri?.lastPathSegment}")
                Spacer(modifier = Modifier.height(16.dp))
                
                Button(
                    onClick = { selectedUri?.let { viewModel.uploadMedia(it) } },
                    enabled = uploadState !is UiState.Loading,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    if (uploadState is UiState.Loading) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(24.dp),
                            color = MaterialTheme.colorScheme.onPrimary
                        )
                    } else {
                        Text("Upload Now")
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            when (val state = uploadState) {
                is UiState.Success -> {
                    if (state.data != "Ready") {
                        Text("Success: ${state.data}", color = MaterialTheme.colorScheme.primary)
                    }
                }
                is UiState.Error -> {
                    Text("Error: ${state.message}", color = MaterialTheme.colorScheme.error)
                }
                else -> {}
            }
        }
    }
}
