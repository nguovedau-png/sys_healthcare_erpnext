import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    // Welcome Card
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Welcome Back!")
                            .font(.system(size: 24, weight: .bold))
                            .foregroundColor(.primaryBlue)
                        
                        Text("Manage your organization efficiently")
                            .font(.system(size: 14))
                            .foregroundColor(.textSecondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(20)
                    .background(Color.primaryBlue.opacity(0.1))
                    .cornerRadius(16)
                    .padding(.horizontal)
                    
                    // Quick Stats
                    HStack(spacing: 16) {
                        StatCard(icon: "building.2", title: "Departments", value: "12")
                        StatCard(icon: "person.3", title: "Employees", value: "48")
                    }
                    .padding(.horizontal)
                    
                    // Quick Actions
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Quick Actions")
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundColor(.textPrimary)
                            .padding(.horizontal)
                        
                        VStack(spacing: 12) {
                            QuickActionButton(icon: "plus.circle", title: "Add Employee", color: .primaryBlue)
                            QuickActionButton(icon: "building.2.crop.circle", title: "Add Department", color: .accentOrange)
                            QuickActionButton(icon: "chart.bar", title: "View Reports", color: .successGreen)
                        }
                        .padding(.horizontal)
                    }
                    
                    Spacer()
                }
                .padding(.top)
            }
            .navigationTitle("Dashboard")
            .navigationBarTitleDisplayMode(.large)
        }
    }
}

struct StatCard: View {
    let icon: String
    let title: String
    let value: String
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 32))
                .foregroundColor(.primaryBlue)
            
            Text(value)
                .font(.system(size: 24, weight: .bold))
                .foregroundColor(.textPrimary)
            
            Text(title)
                .font(.system(size: 12))
                .foregroundColor(.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.surfaceWhite)
        .cornerRadius(12)
        .shadow(color: .gray.opacity(0.1), radius: 5, x: 0, y: 2)
    }
}

struct QuickActionButton: View {
    let icon: String
    let title: String
    let color: Color
    
    var body: some View {
        Button(action: {}) {
            HStack {
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundColor(color)
                
                Text(title)
                    .font(.system(size: 16))
                    .foregroundColor(.textPrimary)
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .font(.system(size: 14))
                    .foregroundColor(.textSecondary)
            }
            .padding()
            .background(Color.surfaceWhite)
            .cornerRadius(12)
            .shadow(color: .gray.opacity(0.1), radius: 5, x: 0, y: 2)
        }
    }
}
