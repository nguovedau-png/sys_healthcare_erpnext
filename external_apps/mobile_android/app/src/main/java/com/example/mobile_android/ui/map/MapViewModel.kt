package com.example.mobile_android.ui.map

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.android.gms.maps.model.LatLng
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MapViewModel @Inject constructor() : ViewModel() {

    // Default to a known location (e.g., Ho Chi Minh City) if permission is denied initially
    private val _currentLocation = MutableStateFlow<LatLng?>(null)
    val currentLocation: StateFlow<LatLng?> = _currentLocation.asStateFlow()

    private val _destination = MutableStateFlow<LatLng?>(null)
    val destination: StateFlow<LatLng?> = _destination.asStateFlow()

    private val _routePoints = MutableStateFlow<List<LatLng>>(emptyList())
    val routePoints: StateFlow<List<LatLng>> = _routePoints.asStateFlow()
    
    init {
        // Set a dummy destination for demonstration
        _destination.value = LatLng(10.7769, 106.7009) // Bitexco Financial Tower
        simulateRoute()
    }

    fun updateLocation(lat: Double, lng: Double) {
        val newLoc = LatLng(lat, lng)
        _currentLocation.value = newLoc
        simulateRoute()
    }

    private fun simulateRoute() {
        val start = _currentLocation.value ?: LatLng(10.762622, 106.660172) // Default start
        val end = _destination.value ?: return

        // Simple straight line for now, or mock points
        // In a real app, you'd call Google Directions API here
        val points = mutableListOf<LatLng>()
        points.add(start)
        // Add a midpoint to make it look like a route
        points.add(LatLng((start.latitude + end.latitude) / 2, (start.longitude + end.longitude) / 2))
        points.add(end)
        
        _routePoints.value = points
    }
}
