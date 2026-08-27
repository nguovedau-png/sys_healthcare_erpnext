package com.example.mobile_android.data.model

import java.util.Date

data class Transaction(
    val id: String,
    val amount: Double,
    val currency: String,
    val status: TransactionStatus,
    val method: String, // Stripe, VNPay, MoMo, IAP
    val date: Date,
    val description: String
)

enum class TransactionStatus {
    PENDING, SUCCESS, FAILED, REFUNDED
}

data class Invoice(
    val id: String,
    val transactionId: String,
    val url: String, // URL to PDF
    val issuedDate: Date,
    val customerName: String,
    val items: List<InvoiceItem>
)

data class InvoiceItem(
    val description: String,
    val quantity: Int,
    val unitPrice: Double
)

data class StripePaymentConfig(
    val paymentIntentClientSecret: String,
    val ephemeralKeySecret: String,
    val customerId: String,
    val publishableKey: String
)
