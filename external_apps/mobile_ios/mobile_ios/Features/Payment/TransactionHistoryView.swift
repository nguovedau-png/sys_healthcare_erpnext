//
//  TransactionHistoryView.swift
//  mobile_ios
//
//  Created for Payment & Billing Feature
//

import SwiftUI

struct TransactionHistoryView: View {
    @StateObject private var viewModel = PaymentViewModel()
    
    var body: some View {
        Group {
            switch viewModel.historyState {
            case .idle:
                Text("Loading...")
            case .loading:
                ProgressView()
            case .success(let transactions):
                List(transactions) { transaction in
                    NavigationLink(destination: InvoiceDetailView(invoice: createMockInvoice(for: transaction))) {
                        TransactionRow(transaction: transaction)
                    }
                }
            case .error(let message):
                Text(message).foregroundColor(.red)
            }
        }
        .navigationTitle("History")
    }
    
    private func createMockInvoice(for transaction: Transaction) -> Invoice {
        // In real app, fetch from viewModel
        Invoice(
            id: "INV-\(transaction.id)",
            transactionId: transaction.id,
            url: "https://example.com/invoices/\(transaction.id).pdf",
            issuedDate: Date(),
            customerName: "John Doe",
            items: [
                InvoiceItem(description: "Premium Subscription", quantity: 1, unitPrice: 10.0),
                InvoiceItem(description: "Additional Storage", quantity: 2, unitPrice: 5.0)
            ]
        )
    }
}

struct TransactionRow: View {
    let transaction: Transaction
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(transaction.description)
                    .font(.headline)
                Spacer()
                Text("\(String(format: "%.2f", transaction.amount)) \(transaction.currency)")
                    .font(.headline)
                    .foregroundColor(.primaryBlue)
            }
            
            HStack {
                Text(transaction.date.formatted(date: .abbreviated, time: .shortened))
                    .font(.caption)
                    .foregroundColor(.secondary)
                Spacer()
                Text(transaction.status.rawValue)
                    .font(.caption)
                    .foregroundColor(statusColor(transaction.status))
                    .padding(4)
                    .background(statusColor(transaction.status).opacity(0.1))
                    .cornerRadius(4)
            }
            
            Text("Method: \(transaction.method)")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding(.vertical, 4)
    }
    
    private func statusColor(_ status: TransactionStatus) -> Color {
        switch status {
        case .success: return .green
        case .pending: return .orange
        case .failed: return .red
        case .refunded: return .gray
        }
    }
}
