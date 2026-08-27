//
//  GraphQLClient.swift
//  mobile_ios
//
//  Created for API Integration
//

import Foundation

enum GraphQLError: Error {
    case invalidURL
    case networkError(Error)
    case decodingError(Error)
    case apiError([String: Any])
}

class GraphQLClient {
    static let shared = GraphQLClient()
    
    private let baseURL = URL(string: "https://api.example.com/graphql")!
    private let networkClient = NetworkClient.shared
    
    private init() {}
    
    /// Execute GraphQL Query/Mutation
    /// Note: In a real app, use Apollo Client (iOS)
    func performOperation(query: String, variables: [String: Any]? = nil, completion: @escaping (Result<[String: Any], Error>) -> Void) {
        var body: [String: Any] = ["query": query]
        if let variables = variables {
            body["variables"] = variables
        }
        
        var request = URLRequest(url: baseURL)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body, options: [])
        } catch {
            completion(.failure(error))
            return
        }
        
        // Use standard NetworkClient behavior implicitly by manual task or implement custom request
        // For simplicity, using URLSession directly here or you can extend NetworkClient
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(GraphQLError.networkError(error)))
                return
            }
            
            guard let data = data else {
                completion(.failure(GraphQLError.networkError(NSError(domain: "No Data", code: 0))))
                return
            }
            
            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                    if let errors = json["errors"] as? [[String: Any]], !errors.isEmpty {
                        completion(.failure(GraphQLError.apiError(errors[0])))
                    } else if let data = json["data"] as? [String: Any] {
                        completion(.success(data))
                    } else {
                        completion(.success(json))
                    }
                }
            } catch {
                completion(.failure(GraphQLError.decodingError(error)))
            }
        }
        task.resume()
    }
}
