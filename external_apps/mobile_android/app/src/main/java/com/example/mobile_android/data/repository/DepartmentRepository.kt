package com.example.mobile_android.data.repository

import com.example.mobile_android.data.network.ApiService
import com.example.mobile_android.data.network.DepartmentDto
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class DepartmentRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getDepartments(): List<DepartmentDto> {
        val response = apiService.getDepartments()
        if (response.success) {
            return response.data ?: emptyList()
        } else {
            throw Exception(response.message ?: "Failed to fetch departments")
        }
    }

    suspend fun createDepartment(department: DepartmentDto): DepartmentDto {
        val response = apiService.createDepartment(department)
        if (response.success && response.data != null) {
            return response.data
        } else {
            throw Exception(response.message ?: "Failed to create department")
        }
    }

    suspend fun updateDepartment(id: String, department: DepartmentDto): DepartmentDto {
        val response = apiService.updateDepartment(id, department)
        if (response.success && response.data != null) {
            return response.data
        } else {
            throw Exception(response.message ?: "Failed to update department")
        }
    }

    suspend fun deleteDepartment(id: String) {
        val response = apiService.deleteDepartment(id)
        if (!response.success) {
            throw Exception(response.message ?: "Failed to delete department")
        }
    }
}
