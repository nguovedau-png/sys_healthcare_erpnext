package com.example.mobile_android

import android.app.Application
import com.stripe.android.PaymentConfiguration
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MobileApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize Stripe with a test key
        PaymentConfiguration.init(
            applicationContext,
            "pk_test_51MockKeyForDemonstrationPurposeOnly123456789"
        )
    }
}
