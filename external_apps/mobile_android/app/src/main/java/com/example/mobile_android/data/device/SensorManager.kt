package com.example.mobile_android.data.device

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager as AndroidSensorManager
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import javax.inject.Inject
import javax.inject.Singleton

data class AccelerometerData(
    val x: Float,
    val y: Float,
    val z: Float,
    val timestamp: Long
)

data class GyroscopeData(
    val x: Float,
    val y: Float,
    val z: Float,
    val timestamp: Long
)

@Singleton
class SensorManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as AndroidSensorManager
    
    /**
     * Check if accelerometer is available
     */
    fun hasAccelerometer(): Boolean {
        return sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER) != null
    }
    
    /**
     * Check if gyroscope is available
     */
    fun hasGyroscope(): Boolean {
        return sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE) != null
    }
    
    /**
     * Get accelerometer data stream
     */
    fun getAccelerometerData(samplingPeriodUs: Int = AndroidSensorManager.SENSOR_DELAY_NORMAL): Flow<AccelerometerData> = callbackFlow {
        val sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        
        if (sensor == null) {
            close()
            return@callbackFlow
        }
        
        val listener = object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                trySend(
                    AccelerometerData(
                        x = event.values[0],
                        y = event.values[1],
                        z = event.values[2],
                        timestamp = event.timestamp
                    )
                )
            }
            
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
                // Not needed for this use case
            }
        }
        
        sensorManager.registerListener(listener, sensor, samplingPeriodUs)
        
        awaitClose {
            sensorManager.unregisterListener(listener)
        }
    }
    
    /**
     * Get gyroscope data stream
     */
    fun getGyroscopeData(samplingPeriodUs: Int = AndroidSensorManager.SENSOR_DELAY_NORMAL): Flow<GyroscopeData> = callbackFlow {
        val sensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
        
        if (sensor == null) {
            close()
            return@callbackFlow
        }
        
        val listener = object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                trySend(
                    GyroscopeData(
                        x = event.values[0],
                        y = event.values[1],
                        z = event.values[2],
                        timestamp = event.timestamp
                    )
                )
            }
            
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
                // Not needed for this use case
            }
        }
        
        sensorManager.registerListener(listener, sensor, samplingPeriodUs)
        
        awaitClose {
            sensorManager.unregisterListener(listener)
        }
    }
    
    /**
     * Detect shake gesture
     */
    fun detectShake(threshold: Float = 15f): Flow<Boolean> = callbackFlow {
        val sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        
        if (sensor == null) {
            close()
            return@callbackFlow
        }
        
        var lastUpdate = 0L
        var lastX = 0f
        var lastY = 0f
        var lastZ = 0f
        
        val listener = object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                val currentTime = System.currentTimeMillis()
                
                if (currentTime - lastUpdate > 100) {
                    val diffTime = currentTime - lastUpdate
                    lastUpdate = currentTime
                    
                    val x = event.values[0]
                    val y = event.values[1]
                    val z = event.values[2]
                    
                    val speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000
                    
                    if (speed > threshold) {
                        trySend(true)
                    }
                    
                    lastX = x
                    lastY = y
                    lastZ = z
                }
            }
            
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
        }
        
        sensorManager.registerListener(listener, sensor, AndroidSensorManager.SENSOR_DELAY_NORMAL)
        
        awaitClose {
            sensorManager.unregisterListener(listener)
        }
    }
}
