//
//  PaymentRepository.swift
//  mobile_ios
//
//  Created for Payment & Billing Feature
//

import Foundation

protocol PaymentRepositoryProtocol {
    func getTransactionHistory() async throws -> [Transaction]
    func createPaymentIntent(method: String, amount: Double, currency: String) async throws -> String
    func getStripePaymentConfig() async throws -> StripePaymentConfig
    func getInvoice(transactionId: String) async throws -> Invoice
}

class MockPaymentRepository: PaymentRepositoryProtocol {
    func getTransactionHistory() async throws -> [Transaction] {
        try await Task.sleep(nanoseconds: 1 * 1_000_000_000) // 1 sec
        return [
            Transaction(id: "1", amount: 10.0, currency: "USD", status: .success, method: "Stripe", date: Date(), description: "Premium Subscription"),
            Transaction(id: "2", amount: 50000.0, currency: "VND", status: .success, method: "MoMo", date: Date(), description: "Coin Pack 1"),
            Transaction(id: "3", amount: 200000.0, currency: "VND", status: .failed, method: "VNPay", date: Date(), description: "Coin Pack 2")
        ]
    }
    
    func createPaymentIntent(method: String, amount: Double, currency: String) async throws -> String {
        try await Task.sleep(nanoseconds: 1 * 1_000_000_000)
        return "dummy_client_secret"
    }
    
    func getStripePaymentConfig() async throws -> StripePaymentConfig {
        try await Task.sleep(nanoseconds: 1 * 1_000_000_000)
        return StripePaymentConfig(
            paymentIntentClientSecret: "pi_1234567890_secret_1234567890",
            ephemeralKeySecret: "ek_1234567890",
            customerId: "cus_1234567890",
            publishableKey: "pk_test_51MockKey..."
        )
    }
    
    func getInvoice(transactionId: String) async throws -> Invoice {
        try await Task.sleep(nanoseconds: 500_000_000)
        return Invoice(
            id: "INV-\(transactionId)",
            transactionId: transactionId,
            url: "https://example.com/invoices/\(transactionId).pdf",
            issuedDate: Date(),
            customerName: "John Doe",
            items: [
                InvoiceItem(description: "Premium Subscription", quantity: 1, unitPrice: 10.0),
                InvoiceItem(description: "Additional Storage", quantity: 2, unitPrice: 5.0)
            ]
        )
    }
}
