package com.example.mobile_android.ui.auth

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.mobile_android.ui.navigation.Screen
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.ui.res.stringResource
import com.example.mobile_android.R

@Composable
fun LoginScreen(
    onNavigateToHome: () -> Unit,
    onNavigateTo2FA: (String, String) -> Unit,
    onNavigateTo2FA: (String, String) -> Unit,
    viewModel: LoginViewModel = hiltViewModel()
) {
    val context = androidx.compose.ui.platform.LocalContext.current
    var email by remember { mutableStateOf("admin@example.com") }
    var password by remember { mutableStateOf("admin@123") }
    val loginState by viewModel.loginState.collectAsState()

    LaunchedEffect(loginState) {
        when (loginState) {
            is LoginState.Success -> onNavigateToHome()
            is LoginState.NavigateTo2FA -> {
                val state = loginState as LoginState.NavigateTo2FA
                onNavigateTo2FA(state.tempToken, state.email)
            }
            else -> {}
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxWidth()
        ) {
            // Header
            Text(
                text = stringResource(R.string.welcome_back),
                style = MaterialTheme.typography.headlineMedium,
                color = MaterialTheme.colorScheme.primary,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold
            )
            Text(
                text = stringResource(R.string.sign_in_subtitle),
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 8.dp, bottom = 32.dp)
            )

            // Email Input
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text(stringResource(R.string.email_label)) },
                leadingIcon = { 
                    Icon(
                        imageVector = androidx.compose.material.icons.Icons.Default.Email, 
                        contentDescription = stringResource(R.string.email_icon_desc)
                    ) 
                },
                shape = androidx.compose.foundation.shape.RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Password Input
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text(stringResource(R.string.password_label)) },
                leadingIcon = { 
                    Icon(
                        imageVector = androidx.compose.material.icons.Icons.Default.Lock, 
                        contentDescription = stringResource(R.string.lock_icon_desc)
                    ) 
                },
                visualTransformation = PasswordVisualTransformation(),
                shape = androidx.compose.foundation.shape.RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Action Button
            if (loginState is LoginState.Loading) {
                CircularProgressIndicator()
            } else {
                Button(
                    onClick = { viewModel.login(email, password) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(50.dp),
                    shape = androidx.compose.foundation.shape.RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = stringResource(R.string.sign_in_button),
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = androidx.compose.ui.text.font.FontWeight.Bold
                    )
                }
            }

            // Error Message
            if (loginState is LoginState.Error) {
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = (loginState as LoginState.Error).message,
                    color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodyMedium
                )
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Forgot Password
            TextButton(onClick = { /* TODO: Navigate to ForgotPasswordScreen */ }) {
                Text("Forgot Password?", color = MaterialTheme.colorScheme.primary)
            }
            
            // Divider with "OR"
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 24.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                HorizontalDivider(modifier = Modifier.weight(1f))
                Text(
                    text = "OR",
                    modifier = Modifier.padding(horizontal = 16.dp),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                HorizontalDivider(modifier = Modifier.weight(1f))
            }
            
            // Social Login Buttons
            OutlinedButton(
                onClick = { 
                    if (context is android.app.Activity) {
                        viewModel.loginWithGoogle(context)
                    }
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Icon(
                    imageVector = Icons.Default.Email, // Replace with Google icon
                    contentDescription = "Google",
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text("Continue with Google")
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            OutlinedButton(
                onClick = { 
                    if (context is android.app.Activity) {
                        viewModel.loginWithFacebook(context)
                    }
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Icon(
                    imageVector = Icons.Default.Email, // Replace with Facebook icon
                    contentDescription = "Facebook",
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text("Continue with Facebook")
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            OutlinedButton(
                onClick = { 
                    if (context is android.app.Activity) {
                        viewModel.loginWithApple(context)
                    }
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Icon(
                    imageVector = Icons.Default.Lock, // Replace with Apple icon
                    contentDescription = "Apple",
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text("Continue with Apple")
            }
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // Register Link
            Row {
                Text("Don't have an account? ")
                TextButton(onClick = { /* TODO: Navigate to RegisterScreen */ }) {
                    Text("Sign Up")
                }
            }
        }
    }
}
