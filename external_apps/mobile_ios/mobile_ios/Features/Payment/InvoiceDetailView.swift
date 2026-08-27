//
//  InvoiceDetailView.swift
//  mobile_ios
//
//  Created for Payment & Billing Feature
//

import SwiftUI

struct InvoiceDetailView: View {
    let invoice: Invoice
    
    private var subtotal: Double {
        invoice.items.reduce(0) { $0 + (Double($1.quantity) * $1.unitPrice) }
    }
    
    private var tax: Double {
        subtotal * 0.1 // 10% tax
    }
    
    private var total: Double {
        subtotal + tax
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header Info
                VStack(alignment: .leading, spacing: 12) {
                    Text("Invoice Details")
                        .font(.headline)
                        .fontWeight(.bold)
                    
                    Divider()
                    
                    HStack {
                        Text("Customer:")
                        Spacer()
                        Text(invoice.customerName)
                            .fontWeight(.medium)
                    }
                    
                    HStack {
                        Text("Issued Date:")
                        Spacer()
                        Text(invoice.issuedDate, style: .date)
                    }
                    
                    HStack {
                        Text("Transaction ID:")
                        Spacer()
                        Text(invoice.transactionId)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
                .padding()
                .background(Color(.systemBackground))
                .cornerRadius(12)
                .shadow(radius: 2)
                
                // Items
                VStack(alignment: .leading, spacing: 12) {
                    Text("Items")
                        .font(.headline)
                        .fontWeight(.bold)
                    
                    ForEach(invoice.items) { item in
                        HStack {
                            VStack(alignment: .leading) {
                                Text(item.description)
                                    .font(.body)
                                    .fontWeight(.medium)
                                Text("Qty: \(item.quantity) × \(item.unitPrice, specifier: "%.2f")")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Text("\(Double(item.quantity) * item.unitPrice, specifier: "%.2f")")
                                .font(.body)
                                .fontWeight(.bold)
                        }
                        .padding()
                        .background(Color(.systemBackground))
                        .cornerRadius(8)
                        .shadow(radius: 1)
                    }
                }
                
                // Summary
                VStack(spacing: 8) {
                    HStack {
                        Text("Subtotal:")
                        Spacer()
                        Text("\(subtotal, specifier: "%.2f")")
                    }
                    
                    HStack {
                        Text("Tax (10%):")
                        Spacer()
                        Text("\(tax, specifier: "%.2f")")
                    }
                    
                    Divider()
                    
                    HStack {
                        Text("Total:")
                            .font(.title3)
                            .fontWeight(.bold)
                        Spacer()
                        Text("\(total, specifier: "%.2f")")
                            .font(.title3)
                            .fontWeight(.bold)
                            .foregroundColor(.blue)
                    }
                }
                .padding()
                .background(Color.blue.opacity(0.1))
                .cornerRadius(12)
                
                // Actions
                Button(action: {
                    // TODO: Open PDF
                    if let url = URL(string: invoice.url) {
                        UIApplication.shared.open(url)
                    }
                }) {
                    Text("View PDF Invoice")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
            }
            .padding()
        }
        .navigationTitle("Invoice #\(invoice.id)")
        .navigationBarTitleDisplayMode(.inline)
    }
}
