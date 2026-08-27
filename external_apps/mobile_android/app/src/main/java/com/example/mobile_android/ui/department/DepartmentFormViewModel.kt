package com.example.mobile_android.ui.department

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.network.DepartmentDto
import com.example.mobile_android.data.repository.DepartmentRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed class DepartmentFormState {
    object Idle : DepartmentFormState()
    object Loading : DepartmentFormState()
    object Success : DepartmentFormState()
    data class Error(val message: String) : DepartmentFormState()
}

@HiltViewModel
class DepartmentFormViewModel @Inject constructor(
    private val repository: DepartmentRepository,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val departmentId: String? = savedStateHandle.get<String>("departmentId")

    private val _name = MutableStateFlow("")
    val name: StateFlow<String> = _name.asStateFlow()

    private val _description = MutableStateFlow("")
    val description: StateFlow<String> = _description.asStateFlow()

    private val _state = MutableStateFlow<DepartmentFormState>(DepartmentFormState.Idle)
    val state: StateFlow<DepartmentFormState> = _state.asStateFlow()

    val isEditMode: Boolean get() = departmentId != null

    fun updateName(value: String) {
        _name.value = value
    }

    fun updateDescription(value: String) {
        _description.value = value
    }

    fun saveDepartment() {
        viewModelScope.launch {
            _state.value = DepartmentFormState.Loading
            try {
                val department = DepartmentDto(
                    id = departmentId,
                    name = _name.value,
                    description = _description.value.ifEmpty { null },
                    managerId = null
                )

                if (isEditMode && departmentId != null) {
                    repository.updateDepartment(departmentId, department)
                } else {
                    repository.createDepartment(department)
                }
                _state.value = DepartmentFormState.Success
            } catch (e: Exception) {
                _state.value = DepartmentFormState.Error(e.message ?: "Unknown error")
            }
        }
    }
}
