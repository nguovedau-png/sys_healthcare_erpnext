import SwiftUI
import Combine

@MainActor
class EmployeeListViewModel: ObservableObject {
    @Published var employees: [Employee] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let apiService = APIService.shared
    
    func loadEmployees() async {
        isLoading = true
        errorMessage = nil
        
        do {
            employees = try await apiService.getEmployees()
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
}

struct EmployeeListView: View {
    @StateObject private var viewModel = EmployeeListViewModel()
    @State private var showForm = false
    
    var body: some View {
        NavigationView {
            ZStack {
                if viewModel.isLoading {
                    ProgressView()
                } else if let error = viewModel.errorMessage {
                    VStack {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.system(size: 48))
                            .foregroundColor(.errorRed)
                        Text(error)
                            .foregroundColor(.errorRed)
                    }
                } else {
                    List {
                        ForEach(viewModel.employees) { employee in
                            NavigationLink(destination: EmployeeDetailView(employee: employee)) {
                                EmployeeRow(employee: employee)
                            }
                        }
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Nhân Viên")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        showForm = true
                    }) {
                        Image(systemName: "plus")
                    }
                }
            }
            .sheet(isPresented: $showForm) {
                EmployeeFormView(onSave: {
                    Task {
                        await viewModel.loadEmployees()
                    }
                })
            }
            .task {
                await viewModel.loadEmployees()
            }
            .refreshable {
                await viewModel.loadEmployees()
            }
        }
    }
}

struct EmployeeRow: View {
    let employee: Employee
    
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: "person.circle")
                .font(.system(size: 24))
                .foregroundColor(.primaryBlue)
                .frame(width: 40)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(employee.fullName)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.textPrimary)
                
                Text(employee.position)
                    .font(.system(size: 14))
                    .foregroundColor(.textSecondary)
                
                if let email = employee.email {
                    Text(email)
                        .font(.system(size: 12))
                        .foregroundColor(.textSecondary)
                }
            }
        }
        .padding(.vertical, 8)
    }
}
