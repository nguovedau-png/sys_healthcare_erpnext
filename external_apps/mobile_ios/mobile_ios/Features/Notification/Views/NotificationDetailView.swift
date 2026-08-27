//
//  NotificationDetailView.swift
//  mobile_ios
//
//  Created for Notification Feature
//

import SwiftUI

struct NotificationDetailView: View {
    let notification: NotificationModel
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Text(notification.title)
                    .font(.title)
                    .fontWeight(.bold)
                
                Text(notification.timestamp, style: .date)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                
                Divider()
                
                Text(notification.message)
                    .font(.body)
                
                Spacer()
            }
            .padding()
        }
        .navigationTitle(LocalizedStringKey("Details"))
        .navigationBarTitleDisplayMode(.inline)
    }
}
