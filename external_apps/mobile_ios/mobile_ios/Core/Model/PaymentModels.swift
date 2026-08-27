//
//  PaymentModels.swift
//  mobile_ios
//
//  Created for Payment & Billing Feature
//

import Foundation

enum TransactionStatus: String, Codable {
    case pending = "PENDING"
    case success = "SUCCESS"
    case failed = "FAILED"
    case refunded = "REFUNDED"
}

struct Transaction: Identifiable, Codable {
    let id: String
    let amount: Double
    let currency: String
    let status: TransactionStatus
    let method: String // Stripe, VNPay, MoMo, IAP
    let date: Date
    let description: String
}

struct Invoice: Identifiable, Codable {
    let id: String
    let transactionId: String
    let url: String // URL to PDF
    let issuedDate: Date
    let customerName: String
    let items: [InvoiceItem]
}

struct InvoiceItem: Identifiable, Codable {
    let id = UUID()
    let description: String
    let quantity: Int
    let unitPrice: Double
}

struct StripePaymentConfig: Codable {
    let paymentIntentClientSecret: String
    let ephemeralKeySecret: String
    let customerId: String
    let publishableKey: String
}
