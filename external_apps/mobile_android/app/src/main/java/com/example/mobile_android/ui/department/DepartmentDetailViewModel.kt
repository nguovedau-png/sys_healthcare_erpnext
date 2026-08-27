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

sealed class DepartmentDetailState {
    object Loading : DepartmentDetailState()
    data class Success(val department: DepartmentDto) : DepartmentDetailState()
    data class Error(val message: String) : DepartmentDetailState()
    object Deleted : DepartmentDetailState()
}

@HiltViewModel
class DepartmentDetailViewModel @Inject constructor(
    private val repository: DepartmentRepository,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val departmentId: String = checkNotNull(savedStateHandle["departmentId"])

    private val _state = MutableStateFlow<DepartmentDetailState>(DepartmentDetailState.Loading)
    val state: StateFlow<DepartmentDetailState> = _state.asStateFlow()

    init {
        loadDepartment()
    }

    private fun loadDepartment() {
        viewModelScope.launch {
            _state.value = DepartmentDetailState.Loading
            try {
                val departments = repository.getDepartments()
                val department = departments.find { it.id == departmentId }
                if (department != null) {
                    _state.value = DepartmentDetailState.Success(department)
                } else {
                    _state.value = DepartmentDetailState.Error("Department not found")
                }
            } catch (e: Exception) {
                _state.value = DepartmentDetailState.Error(e.message ?: "Unknown error")
            }
        }
    }

    fun deleteDepartment() {
        viewModelScope.launch {
            try {
                repository.deleteDepartment(departmentId)
                _state.value = DepartmentDetailState.Deleted
            } catch (e: Exception) {
                _state.value = DepartmentDetailState.Error(e.message ?: "Failed to delete")
            }
        }
    }
}
