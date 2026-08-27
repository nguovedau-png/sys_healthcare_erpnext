package com.example.mobile_android.data.media

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.net.Uri
import androidx.exifinterface.media.ExifInterface
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ImageProcessor @Inject constructor(
    @ApplicationContext private val context: Context
) {
    
    /**
     * Compress image to specified quality
     */
    suspend fun compressImage(
        uri: Uri,
        quality: Int = 80,
        maxWidth: Int = 1920,
        maxHeight: Int = 1080
    ): File? = withContext(Dispatchers.IO) {
        try {
            val inputStream = context.contentResolver.openInputStream(uri) ?: return@withContext null
            val bitmap = BitmapFactory.decodeStream(inputStream)
            inputStream.close()
            
            // Resize if needed
            val resizedBitmap = resizeBitmap(bitmap, maxWidth, maxHeight)
            
            // Rotate based on EXIF
            val rotatedBitmap = rotateImageIfRequired(uri, resizedBitmap)
            
            // Compress
            val outputFile = File(context.cacheDir, "compressed_${System.currentTimeMillis()}.jpg")
            FileOutputStream(outputFile).use { out ->
                rotatedBitmap.compress(Bitmap.CompressFormat.JPEG, quality, out)
            }
            
            bitmap.recycle()
            if (resizedBitmap != bitmap) resizedBitmap.recycle()
            if (rotatedBitmap != resizedBitmap) rotatedBitmap.recycle()
            
            outputFile
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
    
    /**
     * Resize bitmap to fit within max dimensions
     */
    private fun resizeBitmap(bitmap: Bitmap, maxWidth: Int, maxHeight: Int): Bitmap {
        val width = bitmap.width
        val height = bitmap.height
        
        if (width <= maxWidth && height <= maxHeight) {
            return bitmap
        }
        
        val ratio = minOf(maxWidth.toFloat() / width, maxHeight.toFloat() / height)
        val newWidth = (width * ratio).toInt()
        val newHeight = (height * ratio).toInt()
        
        return Bitmap.createScaledBitmap(bitmap, newWidth, newHeight, true)
    }
    
    /**
     * Rotate image based on EXIF orientation
     */
    private fun rotateImageIfRequired(uri: Uri, bitmap: Bitmap): Bitmap {
        try {
            val inputStream = context.contentResolver.openInputStream(uri) ?: return bitmap
            val exif = ExifInterface(inputStream)
            inputStream.close()
            
            val orientation = exif.getAttributeInt(
                ExifInterface.TAG_ORIENTATION,
                ExifInterface.ORIENTATION_NORMAL
            )
            
            val rotation = when (orientation) {
                ExifInterface.ORIENTATION_ROTATE_90 -> 90f
                ExifInterface.ORIENTATION_ROTATE_180 -> 180f
                ExifInterface.ORIENTATION_ROTATE_270 -> 270f
                else -> return bitmap
            }
            
            val matrix = Matrix()
            matrix.postRotate(rotation)
            return Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
        } catch (e: Exception) {
            e.printStackTrace()
            return bitmap
        }
    }
    
    /**
     * Crop image to specified rectangle
     */
    suspend fun cropImage(
        uri: Uri,
        x: Int,
        y: Int,
        width: Int,
        height: Int
    ): File? = withContext(Dispatchers.IO) {
        try {
            val inputStream = context.contentResolver.openInputStream(uri) ?: return@withContext null
            val bitmap = BitmapFactory.decodeStream(inputStream)
            inputStream.close()
            
            val croppedBitmap = Bitmap.createBitmap(bitmap, x, y, width, height)
            
            val outputFile = File(context.cacheDir, "cropped_${System.currentTimeMillis()}.jpg")
            FileOutputStream(outputFile).use { out ->
                croppedBitmap.compress(Bitmap.CompressFormat.JPEG, 90, out)
            }
            
            bitmap.recycle()
            croppedBitmap.recycle()
            
            outputFile
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
    
    /**
     * Convert image to byte array
     */
    suspend fun imageToByteArray(uri: Uri, quality: Int = 80): ByteArray? = withContext(Dispatchers.IO) {
        try {
            val inputStream = context.contentResolver.openInputStream(uri) ?: return@withContext null
            val bitmap = BitmapFactory.decodeStream(inputStream)
            inputStream.close()
            
            val outputStream = ByteArrayOutputStream()
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream)
            bitmap.recycle()
            
            outputStream.toByteArray()
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
