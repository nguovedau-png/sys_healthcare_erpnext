package com.example.mobile_android.data.network

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.network.okHttpClient
import okhttp3.OkHttpClient
import javax.inject.Inject
import javax.inject.Singleton

/**
 * GraphQL Client using Apollo
 */
@Singleton
class GraphQLClient @Inject constructor(
    private val okHttpClient: OkHttpClient
) {
    
    private val apolloClient by lazy {
        ApolloClient.Builder()
            .serverUrl("https://api.example.com/graphql") // TODO: Replace with actual URL
            .okHttpClient(okHttpClient)
            .build()
    }
    
    fun getClient(): ApolloClient = apolloClient
    
    // Example query usage (commented out until schema is generated)
    /*
    suspend fun <D : Query.Data> query(query: Query<D>): ApolloResponse<D> {
        return apolloClient.query(query).execute()
    }
    */
}
