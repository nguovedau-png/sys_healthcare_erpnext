package com.example.mobile_android.data.repository

import com.example.mobile_android.data.network.ApiService
import com.example.mobile_android.data.network.EmployeeDto
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class EmployeeRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getEmployees(): List<EmployeeDto> {
        val response = apiService.getEmployees()
        if (response.isSuccessful && response.body()?.success == true) {
            return response.body()?.data ?: emptyList()
        } else {
            throw Exception("Failed to fetch employees")
        }
    }

    suspend fun createEmployee(employee: EmployeeDto): EmployeeDto {
        val response = apiService.createEmployee(employee)
        if (response.isSuccessful && response.body()?.success == true && response.body()?.data != null) {
            return response.body()!!.data!!
        } else {
            throw Exception("Failed to create employee")
        }
    }

    suspend fun updateEmployee(id: String, employee: EmployeeDto): EmployeeDto {
        val response = apiService.updateEmployee(id, employee)
        if (response.isSuccessful && response.body()?.success == true && response.body()?.data != null) {
            return response.body()!!.data!!
        } else {
            throw Exception("Failed to update employee")
        }
    }

    suspend fun deleteEmployee(id: String) {
        val response = apiService.deleteEmployee(id)
        if (!response.isSuccessful || response.body()?.success != true) {
            throw Exception("Failed to delete employee")
        }
    }
}
