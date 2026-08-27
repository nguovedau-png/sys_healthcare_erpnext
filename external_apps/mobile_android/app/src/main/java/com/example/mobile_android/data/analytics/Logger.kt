package com.example.mobile_android.data.analytics

import android.util.Log
import java.io.File
import java.io.FileWriter
import java.text.SimpleDateFormat
import java.util.*
import javax.inject.Inject
import javax.inject.Singleton

enum class LogLevel {
    VERBOSE, DEBUG, INFO, WARN, ERROR
}

data class LogEntry(
    val level: LogLevel,
    val tag: String,
    val message: String,
    val throwable: Throwable? = null,
    val timestamp: Long = System.currentTimeMillis()
)

@Singleton
class Logger @Inject constructor() {
    
    private val logs = mutableListOf<LogEntry>()
    private val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS", Locale.getDefault())
    
    companion object {
        private const val MAX_LOGS = 1000
    }
    
    /**
     * Log verbose message
     */
    fun v(tag: String, message: String) {
        log(LogLevel.VERBOSE, tag, message)
        Log.v(tag, message)
    }
    
    /**
     * Log debug message
     */
    fun d(tag: String, message: String) {
        log(LogLevel.DEBUG, tag, message)
        Log.d(tag, message)
    }
    
    /**
     * Log info message
     */
    fun i(tag: String, message: String) {
        log(LogLevel.INFO, tag, message)
        Log.i(tag, message)
    }
    
    /**
     * Log warning message
     */
    fun w(tag: String, message: String, throwable: Throwable? = null) {
        log(LogLevel.WARN, tag, message, throwable)
        if (throwable != null) {
            Log.w(tag, message, throwable)
        } else {
            Log.w(tag, message)
        }
    }
    
    /**
     * Log error message
     */
    fun e(tag: String, message: String, throwable: Throwable? = null) {
        log(LogLevel.ERROR, tag, message, throwable)
        if (throwable != null) {
            Log.e(tag, message, throwable)
        } else {
            Log.e(tag, message)
        }
    }
    
    /**
     * Internal log storage
     */
    private fun log(level: LogLevel, tag: String, message: String, throwable: Throwable? = null) {
        val entry = LogEntry(level, tag, message, throwable)
        logs.add(entry)
        
        // Keep only last MAX_LOGS entries
        if (logs.size > MAX_LOGS) {
            logs.removeAt(0)
        }
    }
    
    /**
     * Get all logs
     */
    fun getLogs(): List<LogEntry> = logs.toList()
    
    /**
     * Get logs by level
     */
    fun getLogsByLevel(level: LogLevel): List<LogEntry> {
        return logs.filter { it.level == level }
    }
    
    /**
     * Get logs by tag
     */
    fun getLogsByTag(tag: String): List<LogEntry> {
        return logs.filter { it.tag == tag }
    }
    
    /**
     * Export logs to file
     */
    fun exportLogs(file: File): Boolean {
        return try {
            FileWriter(file).use { writer ->
                logs.forEach { entry ->
                    val timestamp = dateFormat.format(Date(entry.timestamp))
                    val line = "[$timestamp] [${entry.level}] [${entry.tag}] ${entry.message}"
                    writer.appendLine(line)
                    
                    entry.throwable?.let { throwable ->
                        writer.appendLine(throwable.stackTraceToString())
                    }
                }
            }
            true
        } catch (e: Exception) {
            Log.e("Logger", "Failed to export logs", e)
            false
        }
    }
    
    /**
     * Clear all logs
     */
    fun clearLogs() {
        logs.clear()
    }
    
    /**
     * Format log entry as string
     */
    fun formatLogEntry(entry: LogEntry): String {
        val timestamp = dateFormat.format(Date(entry.timestamp))
        return "[$timestamp] [${entry.level}] [${entry.tag}] ${entry.message}"
    }
}
