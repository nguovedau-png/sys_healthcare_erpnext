import StoreKit
import SwiftUI

@MainActor
class StoreKitManager: ObservableObject {
    @Published var products: [Product] = []
    @Published var purchasedProductIDs = Set<String>()
    
    init() {
        Task {
            await fetchProducts()
        }
    }
    
    func fetchProducts() async {
        do {
            // Replace with real identifiers defined in App Store Connect
            let productIDs = ["com.example.app.subscription.premium"]
            products = try await Product.products(for: productIDs)
        } catch {
            print("Failed to fetch products: \(error)")
        }
    }
    
    func purchase(_ product: Product) async throws {
        let result = try await product.purchase()
        
        switch result {
        case .success(let verification):
            // Verify the transaction
            switch verification {
            case .verified(let transaction):
                // Transaction verified
                purchasedProductIDs.insert(transaction.productID)
                await transaction.finish()
            case .unverified(let transaction, let error):
                // Transaction unverified
                print("Unverified transaction: \(error)")
            }
        case .userCancelled:
            break
        case .pending:
            break
        @unknown default:
            break
        }
    }
}
