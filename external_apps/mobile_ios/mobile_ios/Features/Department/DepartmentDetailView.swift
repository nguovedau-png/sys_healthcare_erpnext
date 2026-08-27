import SwiftUI

struct DepartmentDetailView: View {
    let department: Department
    @State private var showEditForm = false
    @State private var showDeleteAlert = false
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Name Card
                VStack(alignment: .leading, spacing: 8) {
                    Text("Tên Phòng Ban")
                        .font(.system(size: 12))
                        .foregroundColor(.textSecondary)
                    Text(department.name)
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(.textPrimary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(Color.surfaceWhite)
                .cornerRadius(12)
                .shadow(color: .gray.opacity(0.1), radius: 5, x: 0, y: 2)
                
                // Description Card
                if let description = department.description {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Mô Tả")
                            .font(.system(size: 12))
                            .foregroundColor(.textSecondary)
                        Text(description)
                            .font(.system(size: 16))
                            .foregroundColor(.textPrimary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(Color.surfaceWhite)
                    .cornerRadius(12)
                    .shadow(color: .gray.opacity(0.1), radius: 5, x: 0, y: 2)
                }
            }
            .padding()
        }
        .navigationTitle("Chi Tiết Phòng Ban")
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
            DepartmentFormView(department: department, onSave: {
                dismiss()
            })
        }
        .alert("Xác Nhận Xóa", isPresented: $showDeleteAlert) {
            Button("Hủy", role: .cancel) {}
            Button("Xóa", role: .destructive) {
                Task {
                    await deleteDepartment()
                }
            }
        } message: {
            Text("Bạn có chắc chắn muốn xóa phòng ban này?")
        }
    }
    
    private func deleteDepartment() async {
        guard let id = department.id else { return }
        do {
            try await APIService.shared.deleteDepartment(id: id)
            dismiss()
        } catch {
            print("Delete error: \(error)")
        }
    }
}
