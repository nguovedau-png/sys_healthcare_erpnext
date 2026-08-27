//
//  PaymentSelectionView.swift
//  mobile_ios
//
//  Created for Payment & Billing Feature
//

import SwiftUI
// import StripePaymentSheet // TODO: Uncomment when Stripe SDK is added

struct PaymentSelectionView: View {
    @StateObject private var viewModel = PaymentViewModel()
    @Binding var selectedTab: Int // To navigate to history
    
    // Placeholder for PaymentSheet
    // @State private var paymentSheet: PaymentSheet?
    @State private var showPaymentSheet = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                if case .loading = viewModel.stripeConfigState {
                    ProgressView()
                }
                
                Button(action: {
                    viewModel.prepareStripePayment()
                }) {
                    HStack {
                        Image(systemName: "creditcard.fill")
                        Text("Pay with Stripe")
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                }
                
                Button(action: {
                    viewModel.initiatePayment(method: "VNPay", amount: 200000.0)
                }) {
                    HStack {
                        Image(systemName: "qrcode")
                        Text("Pay with VNPay")
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.green)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                }
                
                Button(action: {
                    viewModel.initiatePayment(method: "MoMo", amount: 50000.0)
                }) {
                    HStack {
                        Image(systemName: "dollarsign.circle.fill")
                        Text("Pay with MoMo")
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.pink)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                }
                
                Spacer()
                
                NavigationLink(destination: TransactionHistoryView()) {
                    Text("View Transaction History")
                }
                
                Button(action: {
                    viewModel.purchaseSubscription()
                }) {
                    Text("Subscribe (In-App Purchase)")
                        .customButton(color: .orange)
                }
                
                Spacer()
            }
            .padding()
            .navigationTitle("Payments")
            .onChange(of: viewModel.paymentUrl) { url in
                if let url = url {
                    UIApplication.shared.open(url)
                }
            }
            .onChange(of: viewModel.stripeConfigState) { state in
                if case .success(let config) = state {
                    print("Stripe Config Loaded: \(config)")
                    showPaymentSheet = true
                }
            }
            .alert("Stripe Ready (Mock)", isPresented: $showPaymentSheet) {
                Button("Simulate Success") {
                    // viewModel.onPaymentSuccess()
                }
                Button("Cancel", role: .cancel) { }
            } message: {
                Text("Stripe SDK not installed. Config loaded successfully.")
            }
        }
    }
}

extension View {
    func customButton(color: Color = .blue) -> some View {
        self
            .font(.headline)
            .padding()
            .frame(maxWidth: .infinity)
            .background(color)
            .foregroundColor(.white)
            .cornerRadius(10)
    }
}
