import SwiftUI
import Combine

@MainActor
class DepartmentListViewModel: ObservableObject {
    @Published var departments: [Department] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let apiService = APIService.shared
    
    func loadDepartments() async {
        isLoading = true
        errorMessage = nil
        
        do {
            departments = try await apiService.getDepartments()
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
    
    func deleteDepartment(_ department: Department) async {
        guard let id = department.id else { return }
        
        do {
            try await apiService.deleteDepartment(id: id)
            await loadDepartments()
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

struct DepartmentListView: View {
    @StateObject private var viewModel = DepartmentListViewModel()
    @State private var showForm = false
    @State private var selectedDepartment: Department?
    
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
                        ForEach(viewModel.departments) { department in
                            NavigationLink(destination: DepartmentDetailView(department: department)) {
                                DepartmentRow(department: department)
                            }
                        }
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Phòng Ban")
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
                DepartmentFormView(onSave: {
                    Task {
                        await viewModel.loadDepartments()
                    }
                })
            }
            .task {
                await viewModel.loadDepartments()
            }
            .refreshable {
                await viewModel.loadDepartments()
            }
        }
    }
}

struct DepartmentRow: View {
    let department: Department
    
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: "building.2")
                .font(.system(size: 24))
                .foregroundColor(.primaryBlue)
                .frame(width: 40)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(department.name)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.textPrimary)
                
                if let description = department.description {
                    Text(description)
                        .font(.system(size: 14))
                        .foregroundColor(.textSecondary)
                        .lineLimit(2)
                }
            }
        }
        .padding(.vertical, 8)
    }
}
