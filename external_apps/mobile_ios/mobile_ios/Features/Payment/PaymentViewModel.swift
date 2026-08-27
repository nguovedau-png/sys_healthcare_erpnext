//
//  PaymentViewModel.swift
//  mobile_ios
//
//  Created for Payment & Billing Feature
//

import Foundation

@MainActor
class PaymentViewModel: ObservableObject {
    
    @Published var historyState: ViewState<[Transaction]> = .idle
    @Published var stripeConfigState: ViewState<StripePaymentConfig> = .idle
    @Published var paymentUrl: URL?
    @Published var invoiceState: ViewState<Invoice> = .idle
    
    // In a real app, inject this via DI
    private let repository: PaymentRepositoryProtocol
    let storeKitManager = StoreKitManager()
    
    init(repository: PaymentRepositoryProtocol = MockPaymentRepository()) {
        self.repository = repository
        fetchHistory()
    }

    func purchaseSubscription() {
        Task {
            if let product = await storeKitManager.products.first {
                try? await storeKitManager.purchase(product)
            } else {
                print("No products available")
            }
        }
    }
    
    func fetchHistory() {
        historyState = .loading
        Task {
            do {
                let transactions = try await repository.getTransactionHistory()
                DispatchQueue.main.async {
                    self.historyState = .success(transactions)
                }
            } catch {
                DispatchQueue.main.async {
                    self.historyState = .error(error.localizedDescription)
                }
            }
        }
    }
    
    func prepareStripePayment() {
        stripeConfigState = .loading
        Task {
            do {
                let config = try await repository.getStripePaymentConfig()
                DispatchQueue.main.async {
                    self.stripeConfigState = .success(config)
                }
            } catch {
                DispatchQueue.main.async {
                    self.stripeConfigState = .error(error.localizedDescription)
                }
            }
        }
    }
    
    func initiatePayment(method: String, amount: Double) {
        let urlString = "https://example.com/pay?method=\(method)&amount=\(amount)"
        if let url = URL(string: urlString) {
            DispatchQueue.main.async {
                self.paymentUrl = url
            }
        }
    }
    
    func fetchInvoice(transactionId: String) {
        invoiceState = .loading
        Task {
            do {
                let invoice = try await repository.getInvoice(transactionId: transactionId)
                DispatchQueue.main.async {
                    self.invoiceState = .success(invoice)
                }
            } catch {
                DispatchQueue.main.async {
                    self.invoiceState = .error(error.localizedDescription)
                }
            }
        }
    }
}
