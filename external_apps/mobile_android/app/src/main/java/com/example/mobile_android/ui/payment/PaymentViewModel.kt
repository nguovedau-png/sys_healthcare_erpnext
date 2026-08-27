package com.example.mobile_android.ui.payment

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.model.Transaction
import com.example.mobile_android.data.repository.PaymentRepository
import com.example.mobile_android.data.model.StripePaymentConfig
import com.example.mobile_android.ui.core.UiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject
import kotlinx.coroutines.delay

import com.example.mobile_android.data.billing.BillingManager
import android.app.Activity

@HiltViewModel
class PaymentViewModel @Inject constructor(
    private val repository: PaymentRepository,
    private val billingManager: BillingManager
) : ViewModel() {

    private val _historyState = MutableStateFlow<UiState<List<Transaction>>>(UiState.Loading)
    val historyState: StateFlow<UiState<List<Transaction>>> = _historyState.asStateFlow()

    init {
        billingManager.startConnection()
        fetchHistory()
    }



    private val _stripeConfigState = MutableStateFlow<UiState<StripePaymentConfig>?>(null)
    val stripeConfigState: StateFlow<UiState<StripePaymentConfig>?> = _stripeConfigState.asStateFlow()

    fun fetchHistory() {
        viewModelScope.launch {
            _historyState.value = UiState.Loading
            val result = repository.getTransactionHistory()
            result.onSuccess {
                _historyState.value = UiState.Success(it)
            }.onFailure {
                _historyState.value = UiState.Error(it.message ?: "Unknown error")
            }
        }
    }

    fun prepareStripePayment() {
        viewModelScope.launch {
            _stripeConfigState.value = UiState.Loading
            val result = repository.getStripePaymentConfig()
            result.onSuccess {
                _stripeConfigState.value = UiState.Success(it)
            }.onFailure {
                _stripeConfigState.value = UiState.Error(it.message ?: "Failed to fetch config")
            }
        }
    }

    private val _paymentUrlState = MutableStateFlow<String?>(null)
    val paymentUrlState: StateFlow<String?> = _paymentUrlState.asStateFlow()

    fun initiatePayment(method: String, amount: Double) {
        viewModelScope.launch {
            // Mock: Get URL from repository based on method
            // In real app: response = repository.createPaymentIntent(method, amount, "VND")
            // if success -> _paymentUrlState.value = response.url
            delay(500)
            _paymentUrlState.value = "https://example.com/pay?method=$method&amount=$amount"
        }
    }
    
    fun onPaymentUrlOpened() {
        _paymentUrlState.value = null
    }

    fun onPaymentResult(success: Boolean) {
        if (success) {
            fetchHistory() // Refresh history
        }
    }
    
    fun subscribe(activity: Activity) {
        billingManager.launchPurchaseFlow(activity)
    }
    
    private val _invoiceState = MutableStateFlow<UiState<com.example.mobile_android.data.model.Invoice>?>(null)
    val invoiceState: StateFlow<UiState<com.example.mobile_android.data.model.Invoice>?> = _invoiceState.asStateFlow()
    
    fun fetchInvoice(transactionId: String) {
        viewModelScope.launch {
            _invoiceState.value = UiState.Loading
            val result = repository.getInvoice(transactionId)
            result.onSuccess {
                _invoiceState.value = UiState.Success(it)
            }.onFailure {
                _invoiceState.value = UiState.Error(it.message ?: "Failed to fetch invoice")
            }
        }
    }
}
