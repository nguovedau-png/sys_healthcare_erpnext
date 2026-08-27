//
//  ItemRepository.swift
//  mobile_ios
//
//  Created for SQLite integration
//

import Foundation

class ItemRepository {
    private let dbService: SQLiteService
    private let networkClient: NetworkClient? // Optional if we want to sync later
    
    init(dbService: SQLiteService = .shared, networkClient: NetworkClient? = nil) {
        self.dbService = dbService
        self.networkClient = networkClient
    }
    
    func getAllItems() -> [Item] {
        return dbService.getAll()
    }

    
    func insert(name: String, description: String) {
        dbService.insert(name: name, description: description)
    }
    
    func update(item: Item) {
        dbService.update(item: item)
    }
    
    func delete(item: Item) {
        guard let id = item.id else { return }
        dbService.delete(id: id)
    }
}
