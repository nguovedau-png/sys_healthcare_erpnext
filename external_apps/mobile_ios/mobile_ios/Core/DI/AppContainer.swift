//
//  AppContainer.swift
//  mobile_ios
//
//  Created for Dependency Injection
//

import Foundation

protocol AppContainer {
    var networkClient: NetworkClient { get }
    var itemRepository: ItemRepository { get }
    // Add other dependencies here
}

class AppContainerImpl: AppContainer {
    static let shared = AppContainerImpl()
    
    lazy var networkClient: NetworkClient = {
        return NetworkClientImpl()
    }()
    
    lazy var itemRepository: ItemRepository = {
        return ItemRepository(networkClient: networkClient)
    }()
    
    private init() {}
}
