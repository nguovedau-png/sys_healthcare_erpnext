package com.example.mobile_android.ui.item

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile_android.data.local.entities.Item
import com.example.mobile_android.data.repository.ItemRepository
import com.example.mobile_android.ui.core.UiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ItemViewModel @Inject constructor(
    private val repository: ItemRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<UiState<List<Item>>>(UiState.Loading)
    val uiState: StateFlow<UiState<List<Item>>> = _uiState.asStateFlow()

    init {
        viewModelScope.launch {
            try {
                repository.allItems.collect { itemList ->
                    _uiState.value = UiState.Success(itemList)
                }
            } catch (e: Exception) {
                _uiState.value = UiState.Error(e.message ?: "Unknown error")
            }
        }
    }

    fun addItem(name: String, description: String) {
        viewModelScope.launch {
            try {
                val newItem = Item(name = name, description = description)
                repository.insert(newItem)
            } catch (e: Exception) {
                // In a real app, you might want to show a one-time error event here
                // For now, we update the state if it affects the list, but for insert/update/delete usually we track side effects separately.
                // However, since we collect 'allItems', the list update will happen automatically if successful.
            }
        }
    }

    fun updateItem(item: Item) {
        viewModelScope.launch {
            repository.update(item)
        }
    }

    fun deleteItem(item: Item) {
        viewModelScope.launch {
            repository.delete(item)
        }
    }
}
