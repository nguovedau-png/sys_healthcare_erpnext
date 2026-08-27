package com.example.mobile_android.ui.auth

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel

@Composable
fun TwoFactorScreen(
    tempToken: String,
    email: String,
    onNavigateToHome: () -> Unit,
    viewModel: TwoFactorViewModel = hiltViewModel()
) {
    var code by remember { mutableStateOf("") }
    val verificationState by viewModel.verificationState.collectAsState()

    LaunchedEffect(verificationState) {
        if (verificationState is VerificationState.Success) {
            onNavigateToHome()
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = "Two-Factor Authentication", style = MaterialTheme.typography.headlineMedium)
        
        Spacer(modifier = Modifier.height(32.dp))

        Text(text = "Enter the 6-digit code from your authenticator app.")

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = code,
            onValueChange = { code = it },
            label = { Text("6-Digit Code") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(24.dp))

        if (verificationState is VerificationState.Loading) {
            CircularProgressIndicator()
        } else {
            Button(
                onClick = { viewModel.verify(email, tempToken, code) },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Verify")
            }
        }

        if (verificationState is VerificationState.Error) {
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = (verificationState as VerificationState.Error).message,
                color = MaterialTheme.colorScheme.error
            )
        }
    }
}
