package com.example.mobile_android.data.network

import androidx.compose.runtime.Stable

/**
 * Pagination helper for infinite scroll
 */
@Stable
data class PaginatedResponse<T>(
    val data: List<T>,
    val page: Int,
    val pageSize: Int,
    val totalPages: Int,
    val totalItems: Int,
    val hasNext: Boolean
) {
    val hasPrevious: Boolean get() = page > 1
}

/**
 * Pagination state for UI
 */
@Stable
data class PaginationState<T>(
    val items: List<T> = emptyList(),
    val page: Int = 1,
    val isLoading: Boolean = false,
    val isLoadingMore: Boolean = false,
    val hasMore: Boolean = true,
    val error: String? = null
) {
    fun toLoading(): PaginationState<T> = copy(isLoading = true, error = null)
    fun toLoadingMore(): PaginationState<T> = copy(isLoadingMore = true, error = null)
    fun toSuccess(response: PaginatedResponse<T>): PaginationState<T> = copy(
        items = if (response.page == 1) response.data else items + response.data,
        page = response.page,
        hasMore = response.hasNext,
        isLoading = false,
        isLoadingMore = false,
        error = null
    )
    fun toError(message: String): PaginationState<T> = copy(
        isLoading = false,
        isLoadingMore = false,
        error = message
    )
}

/**
 * Pagination helper class
 */
class PaginationHelper<T>(
    private val pageSize: Int = 20,
    private val fetchData: suspend (page: Int, pageSize: Int) -> PaginatedResponse<T>
) {
    private var currentPage = 1
    private var hasMore = true
    private val allItems = mutableListOf<T>()
    
    suspend fun loadInitial(): PaginatedResponse<T> {
        currentPage = 1
        allItems.clear()
        val response = fetchData(currentPage, pageSize)
        hasMore = response.hasNext
        allItems.addAll(response.data)
        return response
    }
    
    suspend fun loadMore(): PaginatedResponse<T>? {
        if (!hasMore) return null
        
        currentPage++
        val response = fetchData(currentPage, pageSize)
        hasMore = response.hasNext
        allItems.addAll(response.data)
        return response
    }
    
    fun reset() {
        currentPage = 1
        hasMore = true
        allItems.clear()
    }
    
    fun getAllItems(): List<T> = allItems.toList()
}
