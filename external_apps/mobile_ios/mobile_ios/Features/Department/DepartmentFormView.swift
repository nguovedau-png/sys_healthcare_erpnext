import SwiftUI
import Combine

@MainActor
class DepartmentFormViewModel: ObservableObject {
    @Published var name = ""
    @Published var description = ""
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let apiService = APIService.shared
    private let department: Department?
    
    var isEditMode: Bool {
        department != nil
    }
    
    init(department: Department? = nil) {
        self.department = department
        if let dept = department {
            self.name = dept.name
            self.description = dept.description ?? ""
        }
    }
    
    func save() async -> Bool {
        isLoading = true
        errorMessage = nil
        
        let dept = Department(
            id: department?.id,
            name: name,
            description: description.isEmpty ? nil : description,
            managerId: nil
        )
        
        do {
            if let id = department?.id {
                _ = try await apiService.updateDepartment(id: id, dept)
            } else {
                _ = try await apiService.createDepartment(dept)
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

struct DepartmentFormView: View {
    @StateObject private var viewModel: DepartmentFormViewModel
    @Environment(\.dismiss) var dismiss
    let onSave: () -> Void
    
    init(department: Department? = nil, onSave: @escaping () -> Void) {
        _viewModel = StateObject(wrappedValue: DepartmentFormViewModel(department: department))
        self.onSave = onSave
    }
    
    var body: some View {
        NavigationView {
            Form {
                Section {
                    TextField("Tên Phòng Ban *", text: $viewModel.name)
                    
                    TextField("Mô Tả", text: $viewModel.description, axis: .vertical)
                        .lineLimit(3...5)
                }
                
                if let error = viewModel.errorMessage {
                    Section {
                        Text(error)
                            .foregroundColor(.errorRed)
                    }
                }
            }
            .navigationTitle(viewModel.isEditMode ? "Sửa Phòng Ban" : "Thêm Phòng Ban")
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
                    .disabled(viewModel.name.isEmpty || viewModel.isLoading)
                }
            }
        }
    }
}
