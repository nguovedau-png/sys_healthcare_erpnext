package com.example.mobile_android.data.network

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET

interface ApiService {
    @POST("auth/login")
    suspend fun login(@Body body: Map<String, String>): Response<LoginResponse>

    @GET("auth/me")
    suspend fun getCurrentUser(): Response<ApiResponse<UserDto>>

    @GET("employees")
    suspend fun getEmployees(): Response<ApiResponse<List<EmployeeDto>>>

    @GET("employees/{id}")
    suspend fun getEmployee(@retrofit2.http.Path("id") id: String): Response<ApiResponse<EmployeeDto>>

    @POST("employees")
    suspend fun createEmployee(@Body employee: EmployeeDto): Response<ApiResponse<EmployeeDto>>

    @retrofit2.http.PUT("employees/{id}")
    suspend fun updateEmployee(@retrofit2.http.Path("id") id: String, @Body employee: EmployeeDto): Response<ApiResponse<EmployeeDto>>

    @retrofit2.http.DELETE("employees/{id}")
    suspend fun deleteEmployee(@retrofit2.http.Path("id") id: String): Response<ApiResponse<Unit>>

    @GET("departments")
    suspend fun getDepartments(): ApiResponse<List<DepartmentDto>>

    @POST("departments")
    suspend fun createDepartment(@Body department: DepartmentDto): ApiResponse<DepartmentDto>

    @retrofit2.http.PUT("departments/{id}")
    suspend fun updateDepartment(@retrofit2.http.Path("id") id: String, @Body department: DepartmentDto): ApiResponse<DepartmentDto>

    @retrofit2.http.DELETE("departments/{id}")
    suspend fun deleteDepartment(@retrofit2.http.Path("id") id: String): ApiResponse<Unit>

    @retrofit2.http.Multipart
    @POST("upload")
    suspend fun uploadFile(
        @retrofit2.http.Part file: okhttp3.MultipartBody.Part
    ): Response<ApiResponse<String>>
}

data class ApiResponse<T>(
    val success: Boolean,
    val data: T?,
    val message: String?
)

data class LoginResponse(
    val success: Boolean,
    val data: LoginData?,
    val message: String?
)

data class LoginData(
    val user: UserDto,
    val accessToken: String,
    val refreshToken: String,
    val require2FA: Boolean?,
    val tempToken: String?
)

data class UserDto(
    val id: String,
    val email: String,
    val fullName: String,
    val role: String
)

data class EmployeeDto(
    val id: String?,
    val firstName: String,
    val lastName: String,
    val email: String?,
    val position: String,
    val departmentId: String?
)

data class DepartmentDto(
    val id: String?,
    val name: String,
    val description: String?,
    val managerId: String?
)
