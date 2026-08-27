//
//  APIServiceExtension.swift
//  mobile_ios
//
//  Created for Media Upload Feature
//

import Foundation

extension APIService {
    // MARK: - Upload
    func uploadFile(data: Data, mimeType: String, filename: String) async throws -> String {
        guard let url = URL(string: APIConfig.apiURL + "upload") else {
            throw NetworkError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        
        let boundary = "Boundary-\(UUID().uuidString)"
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        if let token = TokenManager.shared.getAccessToken() {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        let httpBody = createMultipartBody(data: data, boundary: boundary, filename: filename, mimeType: mimeType)
        request.httpBody = httpBody
        
        let (responseData, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.serverError("Upload failed")
        }
        
        let decoded = try JSONDecoder().decode(APIResponse<String>.self, from: responseData)
        return decoded.data ?? "Success"
    }
    
    private func createMultipartBody(data: Data, boundary: String, filename: String, mimeType: String) -> Data {
        var body = Data()
        let lineBreak = "\r\n"
        
        body.append("--\(boundary + lineBreak)")
        body.append("Content-Disposition: form-data; name=\"file\"; filename=\"\(filename)\"\(lineBreak)")
        body.append("Content-Type: \(mimeType + lineBreak + lineBreak)")
        body.append(data)
        body.append(lineBreak)
        body.append("--\(boundary)--\(lineBreak)")
        
        return body
    }
}

fileprivate extension Data {
    mutating func append(_ string: String) {
        if let data = string.data(using: .utf8) {
            append(data)
        }
    }
}
