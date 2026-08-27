import SwiftUI

struct MainTabView: View {
    @State private var selectedTab = 0
    @State private var showDrawer = false
    
    var body: some View {
        NavigationView {
            ZStack(alignment: .leading) {
                // Main Content
                TabView(selection: $selectedTab) {
                    HomeView()
                        .tabItem {
                            Label("Home", systemImage: "house")
                        }
                        .tag(0)
                    
                    DepartmentListView()
                        .tabItem {
                            Label("Departments", systemImage: "building.2")
                        }
                        .tag(1)
                    
                    EmployeeListView()
                        .tabItem {
                            Label("Employees", systemImage: "person.3")
                        }
                        .tag(2)
                    
                    SettingsView()
                        .tabItem {
                            Label("Settings", systemImage: "gearshape")
                        }
                        .tag(3)
                    
                    NotificationListView()
                        .tabItem {
                            Label("Notifications", systemImage: "bell")
                        }
                        .tag(4)
                    
                    UploadView()
                        .tabItem {
                            Label("Upload", systemImage: "arrow.up.circle")
                        }
                        .tag(5)

                    MapView()
                        .tabItem {
                            Label("Map", systemImage: "map")
                        }
                        .tag(6)

                    PaymentSelectionView(selectedTab: $selectedTab)
                        .tabItem {
                            Label("Payments", systemImage: "creditcard")
                        }
                        .tag(7)
                }
                .accentColor(.primaryBlue)
                
                // Drawer
                if showDrawer {
                    Color.black.opacity(0.3)
                        .ignoresSafeArea()
                        .onTapGesture {
                            withAnimation {
                                showDrawer = false
                            }
                        }
                    
                    DrawerView(isShowing: $showDrawer, selectedTab: $selectedTab)
                        .frame(width: UIScreen.main.bounds.width * 0.65)
                        .transition(.move(edge: .leading))
                }
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(action: {
                        withAnimation {
                            showDrawer.toggle()
                        }
                    }) {
                        Image(systemName: "line.3.horizontal")
                            .foregroundColor(.primaryBlue)
                    }
                }
            }
        }
    }
}

struct DrawerView: View {
    @Binding var isShowing: Bool
    @Binding var selectedTab: Int
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            VStack(alignment: .leading, spacing: 8) {
                Image(systemName: "person.circle.fill")
                    .font(.system(size: 60))
                    .foregroundColor(.primaryBlue)
                
                Text("Admin User")
                    .font(.system(size: 20, weight: .semibold))
                    .foregroundColor(.textPrimary)
                
                Text("admin@example.com")
                    .font(.system(size: 14))
                    .foregroundColor(.textSecondary)
            }
            .padding(24)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.primaryBlue.opacity(0.1))
            
            // Menu Items
            VStack(spacing: 0) {
                DrawerMenuItem(icon: "house", title: "Home") {
                    selectedTab = 0
                    withAnimation {
                        isShowing = false
                    }
                }
                
                DrawerMenuItem(icon: "message", title: "Chat") {
                    // Assuming Chat is handled elsewhere or is a future tab
                     withAnimation {
                        isShowing = false
                    }
                }
                
                DrawerMenuItem(icon: "bell", title: "Notifications") {
                    selectedTab = 4
                    withAnimation {
                        isShowing = false
                    }
                }
                
                DrawerMenuItem(icon: "arrow.up.circle", title: "Upload Media") {
                    selectedTab = 5
                    withAnimation {
                        isShowing = false
                    }
                }
                
                DrawerMenuItem(icon: "map", title: "Map") {
                    selectedTab = 6
                    withAnimation {
                        isShowing = false
                    }
                }
                
                DrawerMenuItem(icon: "creditcard", title: "Payments") {
                    selectedTab = 7
                    withAnimation {
                        isShowing = false
                    }
                }
                
                DrawerMenuItem(icon: "info.circle", title: "About") {
                    withAnimation {
                        isShowing = false
                    }
                }
            }
            .padding(.top, 16)
            
            Spacer()
        }
        .frame(maxHeight: .infinity)
        .background(Color.surfaceWhite)
        .shadow(radius: 10)
    }
}

struct DrawerMenuItem: View {
    let icon: String
    let title: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundColor(.primaryBlue)
                    .frame(width: 24)
                
                Text(title)
                    .font(.system(size: 16))
                    .foregroundColor(.textPrimary)
                
                Spacer()
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 16)
        }
    }
}
