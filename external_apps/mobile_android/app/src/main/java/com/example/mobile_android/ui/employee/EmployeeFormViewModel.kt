package com.example.mobile_android.ui.employee

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.network.DepartmentDto
import com.example.mobile_android.data.network.EmployeeDto
import com.example.mobile_android.data.repository.DepartmentRepository
import com.example.mobile_android.data.repository.EmployeeRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed class EmployeeFormState {
    object Idle : EmployeeFormState()
    object Loading : EmployeeFormState()
    object Success : EmployeeFormState()
    data class Error(val message: String) : EmployeeFormState()
}

@HiltViewModel
class EmployeeFormViewModel @Inject constructor(
    private val employeeRepository: EmployeeRepository,
    private val departmentRepository: DepartmentRepository,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val employeeId: String? = savedStateHandle.get<String>("employeeId")

    private val _firstName = MutableStateFlow("")
    val firstName: StateFlow<String> = _firstName.asStateFlow()

    private val _lastName = MutableStateFlow("")
    val lastName: StateFlow<String> = _lastName.asStateFlow()

    private val _email = MutableStateFlow("")
    val email: StateFlow<String> = _email.asStateFlow()

    private val _position = MutableStateFlow("")
    val position: StateFlow<String> = _position.asStateFlow()

    private val _selectedDepartmentId = MutableStateFlow<String?>(null)
    val selectedDepartmentId: StateFlow<String?> = _selectedDepartmentId.asStateFlow()

    private val _departments = MutableStateFlow<List<DepartmentDto>>(emptyList())
    val departments: StateFlow<List<DepartmentDto>> = _departments.asStateFlow()

    private val _state = MutableStateFlow<EmployeeFormState>(EmployeeFormState.Idle)
    val state: StateFlow<EmployeeFormState> = _state.asStateFlow()

    val isEditMode: Boolean get() = employeeId != null

    init {
        loadDepartments()
    }

    private fun loadDepartments() {
        viewModelScope.launch {
            try {
                _departments.value = departmentRepository.getDepartments()
            } catch (e: Exception) {
                // Silently fail, departments dropdown will be empty
            }
        }
    }

    fun updateFirstName(value: String) {
        _firstName.value = value
    }

    fun updateLastName(value: String) {
        _lastName.value = value
    }

    fun updateEmail(value: String) {
        _email.value = value
    }

    fun updatePosition(value: String) {
        _position.value = value
    }

    fun updateDepartment(departmentId: String?) {
        _selectedDepartmentId.value = departmentId
    }

    fun saveEmployee() {
        viewModelScope.launch {
            _state.value = EmployeeFormState.Loading
            try {
                val employee = EmployeeDto(
                    id = employeeId,
                    firstName = _firstName.value,
                    lastName = _lastName.value,
                    email = _email.value.ifEmpty { null },
                    position = _position.value,
                    departmentId = _selectedDepartmentId.value
                )

                if (isEditMode && employeeId != null) {
                    employeeRepository.updateEmployee(employeeId, employee)
                } else {
                    employeeRepository.createEmployee(employee)
                }
                _state.value = EmployeeFormState.Success
            } catch (e: Exception) {
                _state.value = EmployeeFormState.Error(e.message ?: "Unknown error")
            }
        }
    }
}
