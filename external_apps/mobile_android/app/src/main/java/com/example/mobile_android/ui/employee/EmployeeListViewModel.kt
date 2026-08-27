package com.example.mobile_android.ui.employee

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

@HiltViewModel
class EmployeeListViewModel @Inject constructor(
    private val employeeRepository: EmployeeRepository
) : ViewModel() {

    private val _employees = MutableStateFlow<List<EmployeeDto>>(emptyList())
    val employees: StateFlow<List<EmployeeDto>> = _employees.asStateFlow()

    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    private val _state = MutableStateFlow<EmployeeListState>(EmployeeListState.Loading)
    val state: StateFlow<EmployeeListState> = _state.asStateFlow()

    init {
        loadEmployees()
    }

    fun loadEmployees() {
        viewModelScope.launch {
            _state.value = EmployeeListState.Loading
            try {
                val employees = employeeRepository.getEmployees()
                _state.value = EmployeeListState.Success(employees)
            } catch (e: Exception) {
                _state.value = EmployeeListState.Error(e.message ?: "Unknown error")
            }
        }
    }
}

sealed class EmployeeListState {
    object Loading : EmployeeListState()
    data class Success(val employees: List<EmployeeDto>) : EmployeeListState()
    data class Error(val message: String) : EmployeeListState()
}
