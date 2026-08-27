//
//  PaginationHelper.swift
//  mobile_ios
//
//  Created for API Integration
//

import Foundation

// MARK: - Paginated Response
struct PaginatedResponse<T: Codable>: Codable {
    let data: [T]
    let page: Int
    let pageSize: Int
    let totalPages: Int
    let totalItems: Int
    let hasNext: Bool
    
    var hasPrevious: Bool {
        page > 1
    }
}

// MARK: - Pagination State
struct PaginationState<T> {
    var items: [T] = []
    var page: Int = 1
    var isLoading: Bool = false
    var isLoadingMore: Bool = false
    var hasMore: Bool = true
    var error: String? = nil
    
    mutating func toLoading() {
        isLoading = true
        error = nil
    }
    
    mutating func toLoadingMore() {
        isLoadingMore = true
        error = nil
    }
    
    mutating func toSuccess(_ response: PaginatedResponse<T>) {
        if response.page == 1 {
            items = response.data
        } else {
            items.append(contentsOf: response.data)
        }
        page = response.page
        hasMore = response.hasNext
        isLoading = false
        isLoadingMore = false
        error = nil
    }
    
    mutating func toError(_ message: String) {
        isLoading = false
        isLoadingMore = false
        error = message
    }
}

// MARK: - Pagination Helper
class PaginationHelper<T: Codable> {
    private let pageSize: Int
    private let fetchData: (Int, Int) async throws -> PaginatedResponse<T>
    
    private var currentPage = 1
    private var hasMore = true
    private var allItems: [T] = []
    
    init(pageSize: Int = 20, fetchData: @escaping (Int, Int) async throws -> PaginatedResponse<T>) {
        self.pageSize = pageSize
        self.fetchData = fetchData
    }
    
    func loadInitial() async throws -> PaginatedResponse<T> {
        currentPage = 1
        allItems.removeAll()
        let response = try await fetchData(currentPage, pageSize)
        hasMore = response.hasNext
        allItems.append(contentsOf: response.data)
        return response
    }
    
    func loadMore() async throws -> PaginatedResponse<T>? {
        guard hasMore else { return nil }
        
        currentPage += 1
        let response = try await fetchData(currentPage, pageSize)
        hasMore = response.hasNext
        allItems.append(contentsOf: response.data)
        return response
    }
    
    func reset() {
        currentPage = 1
        hasMore = true
        allItems.removeAll()
    }
    
    func getAllItems() -> [T] {
        return allItems
    }
}
