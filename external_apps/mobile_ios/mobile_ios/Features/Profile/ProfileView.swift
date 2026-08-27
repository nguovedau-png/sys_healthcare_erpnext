import SwiftUI
import Combine

@MainActor
class ProfileViewModel: ObservableObject {
    @Published var user: User?
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let apiService = APIService.shared
    
    func loadProfile() async {
        isLoading = true
        errorMessage = nil
        
        do {
            user = try await apiService.getCurrentUser()
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
}

struct ProfileView: View {
    @StateObject private var viewModel = ProfileViewModel()
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    if viewModel.isLoading {
                        ProgressView()
                            .padding()
                    } else if let user = viewModel.user {
                        // Profile Header
                        VStack(spacing: 12) {
                            Image(systemName: "person.circle.fill")
                                .font(.system(size: 80))
                                .foregroundColor(.primaryBlue)
                            
                            Text(user.fullName)
                                .font(.system(size: 24, weight: .bold))
                                .foregroundColor(.textPrimary)
                            
                            Text(user.role)
                                .font(.system(size: 14))
                                .foregroundColor(.textSecondary)
                                .padding(.horizontal, 16)
                                .padding(.vertical, 6)
                                .background(Color.primaryBlue.opacity(0.1))
                                .cornerRadius(12)
                        }
                        .padding(.top, 20)
                        
                        // Info Cards
                        VStack(spacing: 16) {
                            ProfileInfoCard(icon: "envelope", label: "Email", value: user.email)
                            ProfileInfoCard(icon: "person", label: "ID Người Dùng", value: user.id)
                            ProfileInfoCard(icon: "star", label: "Vai Trò", value: user.role)
                        }
                        .padding(.horizontal)
                    } else if let error = viewModel.errorMessage {
                        VStack(spacing: 12) {
                            Image(systemName: "exclamationmark.triangle")
                                .font(.system(size: 48))
                                .foregroundColor(.errorRed)
                            Text(error)
                                .foregroundColor(.errorRed)
                        }
                        .padding()
                    }
                }
            }
            .navigationTitle("Thông Tin Cá Nhân")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Đóng") {
                        dismiss()
                    }
                }
            }
            .task {
                await viewModel.loadProfile()
            }
        }
    }
}

struct ProfileInfoCard: View {
    let icon: String
    let label: String
    let value: String
    
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundColor(.primaryBlue)
                .frame(width: 24)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(label)
                    .font(.system(size: 12))
                    .foregroundColor(.textSecondary)
                Text(value)
                    .font(.system(size: 16))
                    .foregroundColor(.textPrimary)
            }
            
            Spacer()
        }
        .padding()
        .background(Color.surfaceWhite)
        .cornerRadius(12)
        .shadow(color: .gray.opacity(0.1), radius: 5, x: 0, y: 2)
    }
}
