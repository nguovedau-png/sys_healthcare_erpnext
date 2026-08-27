import SwiftUI
import Combine

@MainActor
class EmployeeFormViewModel: ObservableObject {
    @Published var firstName = ""
    @Published var lastName = ""
    @Published var email = ""
    @Published var position = ""
    @Published var selectedDepartmentId: String?
    @Published var departments: [Department] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let apiService = APIService.shared
    private let employee: Employee?
    
    var isEditMode: Bool {
        employee != nil
    }
    
    init(employee: Employee? = nil) {
        self.employee = employee
        if let emp = employee {
            self.firstName = emp.firstName
            self.lastName = emp.lastName
            self.email = emp.email ?? ""
            self.position = emp.position
            self.selectedDepartmentId = emp.departmentId
        }
        
        Task {
            await loadDepartments()
        }
    }
    
    func loadDepartments() async {
        do {
            departments = try await apiService.getDepartments()
        } catch {
            print("Failed to load departments: \(error)")
        }
    }
    
    func save() async -> Bool {
        isLoading = true
        errorMessage = nil
        
        let emp = Employee(
            id: employee?.id,
            firstName: firstName,
            lastName: lastName,
            email: email.isEmpty ? nil : email,
            position: position,
            departmentId: selectedDepartmentId
        )
        
        do {
            if let id = employee?.id {
                _ = try await apiService.updateEmployee(id: id, emp)
            } else {
                _ = try await apiService.createEmployee(emp)
            }
            isLoading = false
            return true
        } catch {
            errorMessage = error.localizedDescription
            isLoading = false
            return false
        }
    }
}

struct EmployeeFormView: View {
    @StateObject private var viewModel: EmployeeFormViewModel
    @Environment(\.dismiss) var dismiss
    let onSave: () -> Void
    
    init(employee: Employee? = nil, onSave: @escaping () -> Void) {
        _viewModel = StateObject(wrappedValue: EmployeeFormViewModel(employee: employee))
        self.onSave = onSave
    }
    
    var body: some View {
        NavigationView {
            Form {
                Section {
                    TextField("Họ *", text: $viewModel.firstName)
                    TextField("Tên *", text: $viewModel.lastName)
                    TextField("Email", text: $viewModel.email)
                        .textInputAutocapitalization(.never)
                        .keyboardType(.emailAddress)
                    TextField("Chức Vụ *", text: $viewModel.position)
                }
                
                Section(header: Text("Phòng Ban")) {
                    Picker("Chọn Phòng Ban", selection: $viewModel.selectedDepartmentId) {
                        Text("Không có").tag(nil as String?)
                        ForEach(viewModel.departments) { dept in
                            Text(dept.name).tag(dept.id as String?)
                        }
                    }
                }
                
                if let error = viewModel.errorMessage {
                    Section {
                        Text(error)
                            .foregroundColor(.errorRed)
                    }
                }
            }
            .navigationTitle(viewModel.isEditMode ? "Sửa Nhân Viên" : "Thêm Nhân Viên")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Hủy") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Lưu") {
                        Task {
                            if await viewModel.save() {
                                onSave()
                                dismiss()
                            }
                        }
                    }
                    .disabled(viewModel.firstName.isEmpty || viewModel.lastName.isEmpty || viewModel.position.isEmpty || viewModel.isLoading)
                }
            }
        }
    }
}
