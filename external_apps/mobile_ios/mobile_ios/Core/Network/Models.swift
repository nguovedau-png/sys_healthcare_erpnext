import Foundation

// MARK: - API Response
struct APIResponse<T: Codable>: Codable {
    let success: Bool
    let message: String?
    let data: T?
}

// MARK: - Login
struct LoginRequest: Codable {
    let email: String
    let password: String
}

struct LoginResponse: Codable {
    let accessToken: String
    let refreshToken: String
    let user: User
    let requires2FA: Bool?
}

// MARK: - User
struct User: Codable, Identifiable {
    let id: String
    let email: String
    let fullName: String
    let role: String
}

// MARK: - Department
struct Department: Codable, Identifiable {
    let id: String?
    let name: String
    let description: String?
    let managerId: String?
}

// MARK: - Employee
struct Employee: Codable, Identifiable {
    let id: String?
    let firstName: String
    let lastName: String
    let email: String?
    let position: String
    let departmentId: String?
    
    var fullName: String {
        "\(firstName) \(lastName)"
    }
}

// MARK: - Chat
struct ChatChannel: Codable, Identifiable {
    let id: String
    let name: String
    let lastMessage: String?
    let unreadCount: Int?
}

struct ChatMessage: Codable, Identifiable {
    let id: String
    let channelId: String
    let userId: String
    let content: String
    let createdAt: String
}

enum NetworkError: Error {
    case invalidURL
    case noData
    case decodingError
    case unauthorized
    case serverError(String)
    
    var localizedDescription: String {
        switch self {
        case .invalidURL:
            return "Invalid URL"
        case .noData:
            return "No data received"
        case .decodingError:
            return "Failed to decode response"
        case .unauthorized:
            return "Unauthorized"
        case .serverError(let message):
            return message
        }
    }
}
