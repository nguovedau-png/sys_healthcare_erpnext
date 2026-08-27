package com.example.mobile_android.ui.department

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.repository.DepartmentRepository
import com.example.mobile_android.data.network.DepartmentDto
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed class DepartmentListState {
    object Loading : DepartmentListState()
    data class Success(val departments: List<DepartmentDto>) : DepartmentListState()
    data class Error(val message: String) : DepartmentListState()
}

@HiltViewModel
class DepartmentListViewModel @Inject constructor(
    private val repository: DepartmentRepository
) : ViewModel() {

    private val _state = MutableStateFlow<DepartmentListState>(DepartmentListState.Loading)
    val state: StateFlow<DepartmentListState> = _state.asStateFlow()

    init {
        loadDepartments()
    }

    fun loadDepartments() {
        viewModelScope.launch {
            _state.value = DepartmentListState.Loading
            try {
                val departments = repository.getDepartments()
                _state.value = DepartmentListState.Success(departments)
            } catch (e: Exception) {
                _state.value = DepartmentListState.Error(e.message ?: "Unknown error")
            }
        }
    }
}
