//
//  SyncQueueModel.swift
//  mobile_ios
//
//  Created for Data Sync
//

import Foundation

struct SyncQueueModel: Identifiable {
    let id: Int32
    let endpoint: String
    let method: String
    let payload: String
    let timestamp: Int64
    let retryCount: Int32
}
