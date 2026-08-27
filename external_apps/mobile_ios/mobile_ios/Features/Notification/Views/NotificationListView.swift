//
//  NotificationListView.swift
//  mobile_ios
//
//  Created for Notification Feature
//

import SwiftUI

struct NotificationListView: View {
    // Mock data
    @State private var notifications: [NotificationModel] = [
        NotificationModel(id: "1", title: "Welcome", message: "Welcome to the iOS app!", timestamp: Date(), isRead: false),
        NotificationModel(id: "2", title: "System Update", message: "iOS 17 features available.", timestamp: Date().addingTimeInterval(-86400), isRead: true)
    ]
    
    var body: some View {
        NavigationView {
            List(notifications) { notification in
                NavigationLink(destination: NotificationDetailView(notification: notification)) {
                    HStack {
                        VStack(alignment: .leading, spacing: 5) {
                            Text(notification.title)
                                .font(.headline)
                                .foregroundStyle(notification.isRead ? .secondary : .primary)
                            Text(notification.message)
                                .font(.subheadline)
                                .lineLimit(2)
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                        if !notification.isRead {
                            Circle()
                                .fill(Color.blue)
                                .frame(width: 10, height: 10)
                        }
                    }
                    .padding(.vertical, 4)
                }
            }
            .navigationTitle(LocalizedStringKey("Notifications"))
        }
    }
}

struct NotificationListView_Previews: PreviewProvider {
    static var previews: some View {
        NotificationListView()
    }
}
