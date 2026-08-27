//
//  Item.swift
//  mobile_ios
//
//  Created for SQLite integration
//

import Foundation

struct Item: Identifiable, Codable {
    var id: Int32?
    var name: String
    var description: String
}
