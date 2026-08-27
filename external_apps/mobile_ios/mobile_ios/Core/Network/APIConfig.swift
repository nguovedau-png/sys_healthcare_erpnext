import Foundation

// MARK: - API Configuration
struct APIConfig {
    static let baseURL = "https://929957ec5d0d.ngrok-free.app/api/v1"
    
    // iOS Simulator runs on the same Mac, so use localhost
    // For physical device, use your Mac's IP address
    static var apiURL: String {
        #if targetEnvironment(simulator)
        return "https://929957ec5d0d.ngrok-free.app/api/v1"
        #else
        // Replace with your Mac's IP address for physical device testing
        return "https://929957ec5d0d.ngrok-free.app/api/v1"
        #endif
    }
}

// MARK: - API Endpoints
enum APIEndpoint {
    case login
    case getCurrentUser
    case getEmployees
    case getEmployee(id: String)
    case createEmployee
    case updateEmployee(id: String)
    case deleteEmployee(id: String)
    case getDepartments
    case getDepartment(id: String)
    case createDepartment
    case updateDepartment(id: String)
    case deleteDepartment(id: String)
    case getChatChannels
    case getChatMessages(channelId: String)
    
    var path: String {
        switch self {
        case .login:
            return "/auth/login"
        case .getCurrentUser:
            return "/auth/me"
        case .getEmployees:
            return "/employees"
        case .getEmployee(let id):
            return "/employees/\(id)"
        case .createEmployee:
            return "/employees"
        case .updateEmployee(let id):
            return "/employees/\(id)"
        case .deleteEmployee(let id):
            return "/employees/\(id)"
        case .getDepartments:
            return "/departments"
        case .getDepartment(let id):
            return "/departments/\(id)"
        case .createDepartment:
            return "/departments"
        case .updateDepartment(let id):
            return "/departments/\(id)"
        case .deleteDepartment(let id):
            return "/departments/\(id)"
        case .getChatChannels:
            return "/chat/channels"
        case .getChatMessages(let channelId):
            return "/chat/channels/\(channelId)/messages"
        }
    }
    
    var method: String {
        switch self {
        case .login, .createEmployee, .createDepartment:
            return "POST"
        case .updateEmployee, .updateDepartment:
            return "PUT"
        case .deleteEmployee, .deleteDepartment:
            return "DELETE"
        default:
            return "GET"
        }
    }
}
