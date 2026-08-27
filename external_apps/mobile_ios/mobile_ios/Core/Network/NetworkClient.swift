//
//  NetworkClient.swift
//  mobile_ios
//
//  Created for Networking Refactor
//

import Foundation

protocol NetworkClient {
    func request<T: Codable>(endpoint: APIEndpoint, body: Encodable?) async throws -> T
}

class NetworkClientImpl: NetworkClient {
    private let tokenManager = TokenManager.shared
    private let maxRetries = 3
    private let initialBackoff: TimeInterval = 1.0
    
    private lazy var session: URLSession = {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 30
        config.timeoutIntervalForResource = 30
        return URLSession(configuration: config)
    }()
    
    func request<T: Codable>(endpoint: APIEndpoint, body: Encodable? = nil) async throws -> T {
        var lastError: Error?
        
        for attempt in 0..<maxRetries {
            do {
                return try await performRequest(endpoint: endpoint, body: body)
            } catch {
                lastError = error
                
                // Only retry on network errors
                if shouldRetry(error: error) && attempt < maxRetries - 1 {
                    let backoff = initialBackoff * pow(2.0, Double(attempt))
                    try await Task.sleep(nanoseconds: UInt64(backoff * 1_000_000_000))
                } else {
                    throw error
                }
            }
        }
        
        throw lastError ?? NetworkError.unknown
    }
    
    private func performRequest<T: Codable>(endpoint: APIEndpoint, body: Encodable?) async throws -> T {
        guard let url = URL(string: APIConfig.apiURL + endpoint.path) else {
            throw NetworkError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = endpoint.method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        if let token = tokenManager.getAccessToken() {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        if let body = body {
            request.httpBody = try JSONEncoder().encode(body)
        }
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw NetworkError.noData
        }
        
        if httpResponse.statusCode == 401 {
            throw NetworkError.unauthorized
        }
        
        guard (200...299).contains(httpResponse.statusCode) else {
            if let errorResponse = try? JSONDecoder().decode(APIResponse<String>.self, from: data) {
                 throw NetworkError.serverError(errorResponse.message ?? "Server error")
            }
             throw NetworkError.serverError("HTTP \(httpResponse.statusCode)")
        }
        
        do {
            let decoded = try JSONDecoder().decode(T.self, from: data)
            return decoded
        } catch {
            throw NetworkError.decodingError
        }
    }
    
    private func shouldRetry(error: Error) -> Bool {
        if let urlError = error as? URLError {
            switch urlError.code {
            case .timedOut, .networkConnectionLost, .notConnectedToInternet:
                return true
            default:
                return false
            }
        }
        return false
    }
}
