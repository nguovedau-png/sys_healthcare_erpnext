package com.example.mobile_android.data.sync

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.util.Log
import com.example.mobile_android.data.local.dao.SyncDao
import com.example.mobile_android.data.local.entities.SyncEntity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SyncManager @Inject constructor(
    private val syncDao: SyncDao,
    private val context: Context
) {
    private val scope = CoroutineScope(Dispatchers.IO)

    fun enqueue(endpoint: String, method: String, payload: String) {
        scope.launch {
            val entity = SyncEntity(
                endpoint = endpoint,
                method = method,
                payload = payload
            )
            syncDao.insert(entity)
            processQueue()
        }
    }

    fun processQueue() {
        if (!isNetworkAvailable()) return

        scope.launch {
            val items = syncDao.getAll()
            items.forEach { item ->
                try {
                    // TODO: Execute API call using Retrofit or Http Client
                    // val response = apiClient.execute(item)
                    // if (response.isSuccessful) {
                    //     syncDao.delete(item)
                    // }
                    Log.d("SyncManager", "Processing item: ${item.id} - ${item.endpoint}")
                    // Mock success for now
                    syncDao.delete(item)
                } catch (e: Exception) {
                    Log.e("SyncManager", "Failed to sync item: ${item.id}", e)
                }
            }
        }
    }

    private fun isNetworkAvailable(): Boolean {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = connectivityManager.activeNetwork ?: return false
        val drivers = connectivityManager.getNetworkCapabilities(network) ?: return false
        return drivers.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }
}
