package com.example.mobile_android.data.media

import android.content.Context
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.*
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GalleryPicker @Inject constructor(
    @ApplicationContext private val context: Context
) {
    
    /**
     * Pick single image from gallery
     */
    @Composable
    fun rememberSingleImagePicker(
        onImageSelected: (Uri?) -> Unit
    ): () -> Unit {
        val launcher = rememberLauncherForActivityResult(
            contract = ActivityResultContracts.PickVisualMedia()
        ) { uri ->
            onImageSelected(uri)
        }
        
        return {
            launcher.launch(
                PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)
            )
        }
    }
    
    /**
     * Pick multiple images from gallery
     */
    @Composable
    fun rememberMultipleImagePicker(
        maxItems: Int = 10,
        onImagesSelected: (List<Uri>) -> Unit
    ): () -> Unit {
        val launcher = rememberLauncherForActivityResult(
            contract = ActivityResultContracts.PickMultipleVisualMedia(maxItems)
        ) { uris ->
            onImagesSelected(uris)
        }
        
        return {
            launcher.launch(
                PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)
            )
        }
    }
    
    /**
     * Pick single video from gallery
     */
    @Composable
    fun rememberVideoPicker(
        onVideoSelected: (Uri?) -> Unit
    ): () -> Unit {
        val launcher = rememberLauncherForActivityResult(
            contract = ActivityResultContracts.PickVisualMedia()
        ) { uri ->
            onVideoSelected(uri)
        }
        
        return {
            launcher.launch(
                PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.VideoOnly)
            )
        }
    }
    
    /**
     * Pick any media (image or video)
     */
    @Composable
    fun rememberMediaPicker(
        onMediaSelected: (Uri?) -> Unit
    ): () -> Unit {
        val launcher = rememberLauncherForActivityResult(
            contract = ActivityResultContracts.PickVisualMedia()
        ) { uri ->
            onMediaSelected(uri)
        }
        
        return {
            launcher.launch(
                PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageAndVideo)
            )
        }
    }
}
