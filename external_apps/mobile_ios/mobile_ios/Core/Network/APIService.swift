import Foundation



class APIService {
    static let shared = APIService()
    private let tokenManager = TokenManager.shared
    
    private init() {}
    
    // MARK: - Generic Request
    func request<T: Codable>(
        endpoint: APIEndpoint,
        body: Encodable? = nil
    ) async throws -> T {
        guard let url = URL(string: APIConfig.apiURL + endpoint.path) else {
            throw NetworkError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = endpoint.method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        // Add JWT token if available
        if let token = tokenManager.getAccessToken() {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        // Add body if present
        if let body = body {
            request.httpBody = try JSONEncoder().encode(body)
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
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
    
    // MARK: - Auth
    func login(email: String, password: String) async throws -> LoginResponse {
        let body = LoginRequest(email: email, password: password)
        let wrapper: APIResponse<LoginResponse> = try await request(endpoint: .login, body: body)
        
        guard let response = wrapper.data else {
            throw NetworkError.noData
        }
        
        // Save tokens
        tokenManager.saveAccessToken(response.accessToken)
        tokenManager.saveRefreshToken(response.refreshToken)
        tokenManager.saveUserId(response.user.id)
        
        return response
    }
    
    func getCurrentUser() async throws -> User {
        let response: APIResponse<User> = try await request(endpoint: .getCurrentUser)
        guard let user = response.data else {
            throw NetworkError.noData
        }
        return user
    }
    
    // MARK: - Departments
    func getDepartments() async throws -> [Department] {
        let response: APIResponse<[Department]> = try await request(endpoint: .getDepartments)
        return response.data ?? []
    }
    
    func createDepartment(_ department: Department) async throws -> Department {
        let response: APIResponse<Department> = try await request(endpoint: .createDepartment, body: department)
        guard let dept = response.data else {
            throw NetworkError.noData
        }
        return dept
    }
    
    func updateDepartment(id: String, _ department: Department) async throws -> Department {
        let response: APIResponse<Department> = try await request(endpoint: .updateDepartment(id: id), body: department)
        guard let dept = response.data else {
            throw NetworkError.noData
        }
        return dept
    }
    
    func deleteDepartment(id: String) async throws {
        let _: APIResponse<String> = try await request(endpoint: .deleteDepartment(id: id))
    }
    
    // MARK: - Employees
    func getEmployees() async throws -> [Employee] {
        let response: APIResponse<[Employee]> = try await request(endpoint: .getEmployees)
        return response.data ?? []
    }
    
    func createEmployee(_ employee: Employee) async throws -> Employee {
        let response: APIResponse<Employee> = try await request(endpoint: .createEmployee, body: employee)
        guard let emp = response.data else {
            throw NetworkError.noData
        }
        return emp
    }
    
    func updateEmployee(id: String, _ employee: Employee) async throws -> Employee {
        let response: APIResponse<Employee> = try await request(endpoint: .updateEmployee(id: id), body: employee)
        guard let emp = response.data else {
            throw NetworkError.noData
        }
        return emp
    }
    
    func deleteEmployee(id: String) async throws {
        let _: APIResponse<String> = try await request(endpoint: .deleteEmployee(id: id))
    }
}
