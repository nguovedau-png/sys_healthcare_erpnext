import SwiftUI

struct EmployeeDetailView: View {
    let employee: Employee
    @State private var showEditForm = false
    @State private var showDeleteAlert = false
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Name Card
                VStack(alignment: .leading, spacing: 8) {
                    Text("Họ Tên")
                        .font(.system(size: 12))
                        .foregroundColor(.textSecondary)
                    Text(employee.fullName)
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(.textPrimary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(Color.surfaceWhite)
                .cornerRadius(12)
                .shadow(color: .gray.opacity(0.1), radius: 5, x: 0, y: 2)
                
                // Email Card
                if let email = employee.email {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Email")
                            .font(.system(size: 12))
                            .foregroundColor(.textSecondary)
                        Text(email)
                            .font(.system(size: 16))
                            .foregroundColor(.textPrimary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(Color.surfaceWhite)
                    .cornerRadius(12)
                    .shadow(color: .gray.opacity(0.1), radius: 5, x: 0, y: 2)
                }
                
                // Position Card
                VStack(alignment: .leading, spacing: 8) {
                    Text("Chức Vụ")
                        .font(.system(size: 12))
                        .foregroundColor(.textSecondary)
                    Text(employee.position)
                        .font(.system(size: 16))
                        .foregroundColor(.textPrimary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(Color.surfaceWhite)
                .cornerRadius(12)
                .shadow(color: .gray.opacity(0.1), radius: 5, x: 0, y: 2)
            }
            .padding()
        }
        .navigationTitle("Chi Tiết Nhân Viên")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Menu {
                    Button(action: { showEditForm = true }) {
                        Label("Sửa", systemImage: "pencil")
                    }
                    Button(role: .destructive, action: { showDeleteAlert = true }) {
                        Label("Xóa", systemImage: "trash")
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                }
            }
        }
        .sheet(isPresented: $showEditForm) {
            EmployeeFormView(employee: employee, onSave: {
                dismiss()
            })
        }
        .alert("Xác Nhận Xóa", isPresented: $showDeleteAlert) {
            Button("Hủy", role: .cancel) {}
            Button("Xóa", role: .destructive) {
                Task {
                    await deleteEmployee()
                }
            }
        } message: {
            Text("Bạn có chắc chắn muốn xóa nhân viên này?")
        }
    }
    
    private func deleteEmployee() async {
        guard let id = employee.id else { return }
        do {
            try await APIService.shared.deleteEmployee(id: id)
            dismiss()
        } catch {
            print("Delete error: \(error)")
        }
    }
}
