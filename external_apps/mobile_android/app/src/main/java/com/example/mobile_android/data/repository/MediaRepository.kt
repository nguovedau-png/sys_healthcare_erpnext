package com.example.mobile_android.data.repository

import android.content.Context
import android.net.Uri
import android.provider.OpenableColumns
import com.example.mobile_android.data.network.ApiService
import dagger.hilt.android.qualifiers.ApplicationContext
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject

class MediaRepository @Inject constructor(
    private val apiService: ApiService,
    @ApplicationContext private val context: Context
) {

    suspend fun uploadFile(fileUri: Uri): Result<String> {
        return try {
            val file = uriToFile(fileUri)
            if (file == null) {
                return Result.failure(Exception("Could not process file"))
            }

            val requestFile = file.asRequestBody("multipart/form-data".toMediaTypeOrNull())
            val body = MultipartBody.Part.createFormData("file", file.name, requestFile)

            val response = apiService.uploadFile(body)
            if (response.isSuccessful && response.body()?.success == true) {
                Result.success(response.body()?.message ?: "Upload successful")
            } else {
                Result.failure(Exception(response.message()))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    private fun uriToFile(uri: Uri): File? {
        val contentResolver = context.contentResolver
        val tempFile = File(context.cacheDir, getFileName(uri) ?: "temp_file")
        
        try {
            contentResolver.openInputStream(uri)?.use { inputStream ->
                FileOutputStream(tempFile).use { outputStream ->
                    inputStream.copyTo(outputStream)
                }
            }
            return tempFile
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        }
    }

    private fun getFileName(uri: Uri): String? {
        var name: String? = null
        val cursor = context.contentResolver.query(uri, null, null, null, null)
        cursor?.use {
            if (it.moveToFirst()) {
                val index = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                if (index != -1) {
                    name = it.getString(index)
                }
            }
        }
        return name
    }
}
