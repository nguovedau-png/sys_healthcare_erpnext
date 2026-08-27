package com.example.mobile_android.data.config

import android.content.Context
import android.content.SharedPreferences
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class FeatureFlagManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    
    private val prefs: SharedPreferences = context.getSharedPreferences("feature_flags", Context.MODE_PRIVATE)
    
    private val _flags = MutableStateFlow<Map<String, Boolean>>(emptyMap())
    val flags: StateFlow<Map<String, Boolean>> = _flags
    
    init {
        loadFlags()
    }
    
    /**
     * Check if feature is enabled
     */
    fun isEnabled(featureName: String, defaultValue: Boolean = false): Boolean {
        return prefs.getBoolean(featureName, defaultValue)
    }
    
    /**
     * Enable feature
     */
    fun enable(featureName: String) {
        setFlag(featureName, true)
    }
    
    /**
     * Disable feature
     */
    fun disable(featureName: String) {
        setFlag(featureName, false)
    }
    
    /**
     * Set feature flag value
     */
    fun setFlag(featureName: String, enabled: Boolean) {
        prefs.edit().putBoolean(featureName, enabled).apply()
        loadFlags()
    }
    
    /**
     * Set multiple flags at once
     */
    fun setFlags(flags: Map<String, Boolean>) {
        prefs.edit().apply {
            flags.forEach { (name, enabled) ->
                putBoolean(name, enabled)
            }
        }.apply()
        loadFlags()
    }
    
    /**
     * Load all flags from preferences
     */
    private fun loadFlags() {
        val allFlags = prefs.all.mapNotNull { (key, value) ->
            if (value is Boolean) key to value else null
        }.toMap()
        _flags.value = allFlags
    }
    
    /**
     * Get all flags
     */
    fun getAllFlags(): Map<String, Boolean> = _flags.value
    
    /**
     * Clear all flags
     */
    fun clearAll() {
        prefs.edit().clear().apply()
        loadFlags()
    }
    
    /**
     * Common feature flags
     */
    object Features {
        const val NEW_UI = "new_ui"
        const val DARK_MODE = "dark_mode"
        const val ANALYTICS = "analytics"
        const val PUSH_NOTIFICATIONS = "push_notifications"
        const val SOCIAL_LOGIN = "social_login"
        const val IN_APP_PURCHASE = "in_app_purchase"
        const val BETA_FEATURES = "beta_features"
        const val DEBUG_MENU = "debug_menu"
    }
}
