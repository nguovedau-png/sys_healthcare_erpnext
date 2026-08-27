package com.example.mobile_android.ui.payment

import androidx.compose.foundation.layout.*
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.stripe.android.paymentsheet.PaymentSheetResult
import androidx.compose.ui.Alignment
import com.example.mobile_android.ui.core.UiState
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.LaunchedEffect
import androidx.hilt.navigation.compose.hiltViewModel

import com.stripe.android.paymentsheet.PaymentSheet
import com.stripe.android.paymentsheet.rememberPaymentSheet

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentSelectionScreen(
    onNavigateBack: () -> Unit,
    onNavigateHistory: () -> Unit,
    viewModel: PaymentViewModel = hiltViewModel()
) {
    val stripeConfigState by viewModel.stripeConfigState.collectAsState()
    
    val paymentSheet = rememberPaymentSheet { result ->
        when (result) {
            is PaymentSheetResult.Completed -> {
                viewModel.onPaymentResult(true)
                // Show success message or navigate
            }
            is PaymentSheetResult.Canceled -> {
                // Handle cancellation
            }
            is PaymentSheetResult.Failed -> {
                viewModel.onPaymentResult(false)
                // Handle error
            }
        }
    }
    
    val uriHandler = LocalUriHandler.current
    val paymentUrl by viewModel.paymentUrlState.collectAsState()

    LaunchedEffect(paymentUrl) {
        paymentUrl?.let { url ->
            uriHandler.openUri(url)
            viewModel.onPaymentUrlOpened()
        }
    }

    LaunchedEffect(stripeConfigState) {
        if (stripeConfigState is UiState.Success) {
            val config = (stripeConfigState as UiState.Success).data
            paymentSheet.presentWithPaymentIntent(
                config.paymentIntentClientSecret,
                PaymentSheet.Configuration(
                    merchantDisplayName = "My Merchant Name",
                    customer = PaymentSheet.CustomerConfiguration(
                        id = config.customerId,
                        ephemeralKeySecret = config.ephemeralKeySecret
                    )
                )
            )
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Payment Methods") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    TextButton(onClick = onNavigateHistory) {
                        Text("History")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            if (stripeConfigState is UiState.Loading) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.CenterHorizontally))
            }

            Button(
                onClick = { viewModel.prepareStripePayment() },
                modifier = Modifier.fillMaxWidth(),
                enabled = stripeConfigState !is UiState.Loading
            ) {
                Text("Pay with Stripe")
            }
            


            Button(
                onClick = { viewModel.initiatePayment("VNPay", 200000.0) },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Pay with VNPay")
            }
            
            Button(
                onClick = { viewModel.initiatePayment("MoMo", 50000.0) },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Pay with MoMo")
            }
            
            val context = androidx.compose.ui.platform.LocalContext.current
            
            OutlinedButton(
                onClick = { 
                    val activity = context as? android.app.Activity
                    activity?.let { viewModel.subscribe(it) }
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Subscribe (In-App Purchase)")
            }
        }
    }
}
