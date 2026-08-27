# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/android-sdk-linux/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.

# Retrofit
-keepattributes Signature
-keepattributes Exceptions
-keepattributes *Annotation*

-keep @retrofit2.http.* class * {
    <methods>;
}

-keep class retrofit2.** { *; }
-dontwarn retrofit2.**

# OkHttp
-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# Gson
-keep class com.google.gson.** { *; }
-keep class sun.misc.Unsafe { *; }

# Hilt & Dagger
-keep class dagger.hilt.** { *; }
-keep class com.google.dagger.** { *; }
-keep class javax.inject.** { *; }
-keepnames class dagger.hilt.internal.aggregatedroot.codegen.*
-keepnames class dagger.hilt.android.internal.managers.ViewComponentManager$FragmentContextWrapper$1
-keepnames class dagger.hilt.android.internal.managers.ViewComponentManager$FragmentContextWrapper$2

# Coroutines
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
-keepnames class kotlinx.coroutines.android.AndroidExceptionPreHandler {}
-keepnames class kotlinx.coroutines.android.AndroidDispatcherFactory {}

# Models (Keep data classes)
-keep class com.example.mobile_android.data.model.** { *; }
-keep class com.example.mobile_android.**Response { *; }
-keep class com.example.mobile_android.**Request { *; }
-keep class com.example.mobile_android.**Dto { *; }

# R8/ProGuard optimizations
-optimizations !code/simplification/arithmetic,!code/simplification/cast,!field/*,!class/merging/*
-optimizationpasses 5
-allowaccessmodification
-dontpreverify

# Stripe
-dontwarn com.stripe.**
-keep class com.stripe.** { *; }

# Firebase
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Coil
-keep class coil.** { *; }
-dontwarn coil.**