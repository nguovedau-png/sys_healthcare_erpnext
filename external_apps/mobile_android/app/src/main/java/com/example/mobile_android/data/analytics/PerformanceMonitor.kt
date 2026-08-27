package com.example.mobile_android.data.analytics

import android.content.Context
import android.os.SystemClock
import android.util.Log
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import javax.inject.Inject
import javax.inject.Singleton

data class PerformanceMetric(
    val name: String,
    val durationMs: Long,
    val attributes: Map<String, String> = emptyMap(),
    val timestamp: Long = System.currentTimeMillis()
)

@Singleton
class PerformanceMonitor @Inject constructor(
    @ApplicationContext private val context: Context
) {
    
    private val metrics = mutableListOf<PerformanceMetric>()
    private val activeTraces = mutableMapOf<String, Long>()
    
    private val _appStartTime = SystemClock.elapsedRealtime()
    
    /**
     * Start performance trace
     */
    fun startTrace(traceName: String) {
        activeTraces[traceName] = SystemClock.elapsedRealtime()
        Log.d("PerformanceMonitor", "Started trace: $traceName")
    }
    
    /**
     * Stop performance trace
     */
    fun stopTrace(traceName: String, attributes: Map<String, String> = emptyMap()) {
        val startTime = activeTraces.remove(traceName)
        if (startTime != null) {
            val duration = SystemClock.elapsedRealtime() - startTime
            val metric = PerformanceMetric(traceName, duration, attributes)
            metrics.add(metric)
            
            Log.d("PerformanceMonitor", "Stopped trace: $traceName (${duration}ms)")
            
            // TODO: Send to Firebase Performance
            // val trace = FirebasePerformance.getInstance().newTrace(traceName)
            // attributes.forEach { (key, value) -> trace.putAttribute(key, value) }
            // trace.stop()
        }
    }
    
    /**
     * Measure execution time of a block
     */
    inline fun <T> measureTime(traceName: String, block: () -> T): T {
        startTrace(traceName)
        return try {
            block()
        } finally {
            stopTrace(traceName)
        }
    }
    
    /**
     * Track network request performance
     */
    fun trackNetworkRequest(
        url: String,
        method: String,
        statusCode: Int,
        durationMs: Long,
        requestSize: Long = 0,
        responseSize: Long = 0
    ) {
        val metric = PerformanceMetric(
            name = "network_request",
            durationMs = durationMs,
            attributes = mapOf(
                "url" to url,
                "method" to method,
                "status_code" to statusCode.toString(),
                "request_size" to requestSize.toString(),
                "response_size" to responseSize.toString()
            )
        )
        metrics.add(metric)
        
        Log.d("PerformanceMonitor", "Network: $method $url - ${statusCode} (${durationMs}ms)")
    }
    
    /**
     * Track screen rendering time
     */
    fun trackScreenLoad(screenName: String, durationMs: Long) {
        val metric = PerformanceMetric(
            name = "screen_load",
            durationMs = durationMs,
            attributes = mapOf("screen_name" to screenName)
        )
        metrics.add(metric)
        
        Log.d("PerformanceMonitor", "Screen load: $screenName (${durationMs}ms)")
    }
    
    /**
     * Get app start time
     */
    fun getAppStartTime(): Long {
        return SystemClock.elapsedRealtime() - _appStartTime
    }
    
    /**
     * Get all metrics
     */
    fun getMetrics(): List<PerformanceMetric> = metrics.toList()
    
    /**
     * Get metrics by name
     */
    fun getMetricsByName(name: String): List<PerformanceMetric> {
        return metrics.filter { it.name == name }
    }
    
    /**
     * Get average duration for metric
     */
    fun getAverageDuration(name: String): Long {
        val filtered = getMetricsByName(name)
        return if (filtered.isNotEmpty()) {
            filtered.sumOf { it.durationMs } / filtered.size
        } else {
            0
        }
    }
    
    /**
     * Clear metrics
     */
    fun clearMetrics() {
        metrics.clear()
    }
}
