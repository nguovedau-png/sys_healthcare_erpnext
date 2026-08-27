//
//  ItemViewModel.swift
//  mobile_ios
//
//  Created for SQLite integration
//

import Foundation
import Combine

class ItemViewModel: ObservableObject {
    @Published var items: [Item] = []
    
    private let repository: ItemRepository
    
    init(repository: ItemRepository = AppContainerImpl.shared.itemRepository) {
        self.repository = repository
        fetchItems()
    }
    
    func fetchItems() {
        self.items = repository.getAllItems()
    }
    
    func addItem(name: String, description: String) {
        repository.insert(name: name, description: description)
        fetchItems()
    }
    
    func updateItem(item: Item) {
        repository.update(item: item)
        fetchItems()
    }
    
    func deleteItem(item: Item) {
        repository.delete(item: item)
        fetchItems()
    }
}
