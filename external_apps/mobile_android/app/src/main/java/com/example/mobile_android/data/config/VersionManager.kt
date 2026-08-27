package com.example.mobile_android.data.config

import android.content.Context
import android.content.pm.PackageManager
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject
import javax.inject.Singleton

data class AppVersion(
    val versionName: String,
    val versionCode: Int
)

data class VersionCheckResult(
    val currentVersion: AppVersion,
    val latestVersion: AppVersion,
    val isUpdateAvailable: Boolean,
    val isForceUpdate: Boolean,
    val updateMessage: String? = null,
    val downloadUrl: String? = null
)

@Singleton
class VersionManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    
    /**
     * Get current app version
     */
    fun getCurrentVersion(): AppVersion {
        return try {
            val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            AppVersion(
                versionName = packageInfo.versionName ?: "1.0.0",
                versionCode = packageInfo.longVersionCode.toInt()
            )
        } catch (e: PackageManager.NameNotFoundException) {
            AppVersion("1.0.0", 1)
        }
    }
    
    /**
     * Check for app updates from server
     */
    suspend fun checkForUpdate(): VersionCheckResult = withContext(Dispatchers.IO) {
        val currentVersion = getCurrentVersion()
        
        // TODO: Fetch latest version from server
        // val response = apiService.getLatestVersion()
        
        // Mock response for now
        val latestVersion = AppVersion("1.2.0", 12)
        val minRequiredVersion = AppVersion("1.1.0", 11)
        
        val isUpdateAvailable = latestVersion.versionCode > currentVersion.versionCode
        val isForceUpdate = currentVersion.versionCode < minRequiredVersion.versionCode
        
        VersionCheckResult(
            currentVersion = currentVersion,
            latestVersion = latestVersion,
            isUpdateAvailable = isUpdateAvailable,
            isForceUpdate = isForceUpdate,
            updateMessage = if (isForceUpdate) {
                "A critical update is required to continue using the app"
            } else if (isUpdateAvailable) {
                "A new version is available with bug fixes and improvements"
            } else null,
            downloadUrl = "https://play.google.com/store/apps/details?id=${context.packageName}"
        )
    }
    
    /**
     * Compare two versions
     */
    fun compareVersions(v1: AppVersion, v2: AppVersion): Int {
        return v1.versionCode.compareTo(v2.versionCode)
    }
    
    /**
     * Check if version is outdated
     */
    fun isOutdated(current: AppVersion, latest: AppVersion): Boolean {
        return current.versionCode < latest.versionCode
    }
    
    /**
     * Get version string for display
     */
    fun getVersionString(): String {
        val version = getCurrentVersion()
        return "${version.versionName} (${version.versionCode})"
    }
}
