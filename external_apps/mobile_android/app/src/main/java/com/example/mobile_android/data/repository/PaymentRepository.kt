package com.example.mobile_android.data.repository

import com.example.mobile_android.data.model.Transaction
import com.example.mobile_android.data.model.TransactionStatus
import com.example.mobile_android.data.model.StripePaymentConfig
import kotlinx.coroutines.delay
import java.util.Date
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class PaymentRepository @Inject constructor() {

    // Mock data
    private val transactions = mutableListOf<Transaction>(
        Transaction("1", 10.0, "USD", TransactionStatus.SUCCESS, "Stripe", Date(), "Premium Subscription"),
        Transaction("2", 50000.0, "VND", TransactionStatus.SUCCESS, "MoMo", Date(), "Coin Pack 1"),
        Transaction("3", 200000.0, "VND", TransactionStatus.FAILED, "VNPay", Date(), "Coin Pack 2")
    )

    suspend fun getTransactionHistory(): Result<List<Transaction>> {
        delay(1000) // Simulate network
        return Result.success(transactions)
    }

    suspend fun createPaymentIntent(method: String, amount: Double, currency: String): Result<String> {
        delay(1000)
        // In real app, call API to get client secret or payment URL
        return Result.success("dummy_client_secret_or_url")
    }


    suspend fun getStripePaymentConfig(): Result<StripePaymentConfig> {
        delay(1000)
        // Mock response
        return Result.success(
            StripePaymentConfig(
                paymentIntentClientSecret = "pi_1234567890_secret_1234567890",
                ephemeralKeySecret = "ek_1234567890",
                customerId = "cus_1234567890",
                publishableKey = "pk_test_51MockKey..."
            )
        )
    }
    
    suspend fun getInvoice(transactionId: String): Result<com.example.mobile_android.data.model.Invoice> {
        delay(500)
        return Result.success(
            com.example.mobile_android.data.model.Invoice(
                id = "INV-$transactionId",
                transactionId = transactionId,
                url = "https://example.com/invoices/$transactionId.pdf",
                issuedDate = Date(),
                customerName = "John Doe",
                items = listOf(
                    com.example.mobile_android.data.model.InvoiceItem("Premium Subscription", 1, 10.0),
                    com.example.mobile_android.data.model.InvoiceItem("Additional Storage", 2, 5.0)
                )
            )
        )
    }
}
