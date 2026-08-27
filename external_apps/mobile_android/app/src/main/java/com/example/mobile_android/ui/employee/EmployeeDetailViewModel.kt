package com.example.mobile_android.ui.employee

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.network.EmployeeDto
import com.example.mobile_android.data.repository.EmployeeRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed class EmployeeDetailState {
    object Loading : EmployeeDetailState()
    data class Success(val employee: EmployeeDto) : EmployeeDetailState()
    data class Error(val message: String) : EmployeeDetailState()
    object Deleted : EmployeeDetailState()
}

@HiltViewModel
class EmployeeDetailViewModel @Inject constructor(
    private val repository: EmployeeRepository,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val employeeId: String = checkNotNull(savedStateHandle["employeeId"])

    private val _state = MutableStateFlow<EmployeeDetailState>(EmployeeDetailState.Loading)
    val state: StateFlow<EmployeeDetailState> = _state.asStateFlow()

    init {
        loadEmployee()
    }

    private fun loadEmployee() {
        viewModelScope.launch {
            _state.value = EmployeeDetailState.Loading
            try {
                val employees = repository.getEmployees()
                val employee = employees.find { it.id == employeeId }
                if (employee != null) {
                    _state.value = EmployeeDetailState.Success(employee)
                } else {
                    _state.value = EmployeeDetailState.Error("Employee not found")
                }
            } catch (e: Exception) {
                _state.value = EmployeeDetailState.Error(e.message ?: "Unknown error")
            }
        }
    }

    fun deleteEmployee() {
        viewModelScope.launch {
            try {
                repository.deleteEmployee(employeeId)
                _state.value = EmployeeDetailState.Deleted
            } catch (e: Exception) {
                _state.value = EmployeeDetailState.Error(e.message ?: "Failed to delete")
            }
        }
    }
}
