//
//  LocationManager.swift
//  mobile_ios
//
//  Created for Device Features
//

import Foundation
import CoreLocation
import Combine

struct LocationData {
    let latitude: Double
    let longitude: Double
    let accuracy: Double
    let timestamp: Date
}

struct AddressData {
    let address: String
    let city: String?
    let country: String?
}

class LocationManager: NSObject, ObservableObject {
    static let shared = LocationManager()
    
    @Published var location: LocationData?
    @Published var authorizationStatus: CLAuthorizationStatus = .notDetermined
    
    private let locationManager = CLLocationManager()
    private let geocoder = CLGeocoder()
    
    private override init() {
        super.init()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        authorizationStatus = locationManager.authorizationStatus
    }
    
    /// Request location permission
    func requestPermission() {
        locationManager.requestWhenInUseAuthorization()
    }
    
    /// Get current location (one-time)
    func getCurrentLocation() {
        locationManager.requestLocation()
    }
    
    /// Start continuous location updates
    func startUpdatingLocation() {
        locationManager.startUpdatingLocation()
    }
    
    /// Stop location updates
    func stopUpdatingLocation() {
        locationManager.stopUpdatingLocation()
    }
    
    /// Get address from coordinates
    func getAddress(latitude: Double, longitude: Double, completion: @escaping (AddressData?) -> Void) {
        let location = CLLocation(latitude: latitude, longitude: longitude)
        
        geocoder.reverseGeocodeLocation(location) { placemarks, error in
            guard let placemark = placemarks?.first, error == nil else {
                completion(nil)
                return
            }
            
            let address = AddressData(
                address: [
                    placemark.subThoroughfare,
                    placemark.thoroughfare,
                    placemark.locality,
                    placemark.administrativeArea,
                    placemark.postalCode
                ].compactMap { $0 }.joined(separator: ", "),
                city: placemark.locality,
                country: placemark.country
            )
            
            completion(address)
        }
    }
    
    /// Calculate distance between two coordinates (in meters)
    func calculateDistance(
        from: CLLocationCoordinate2D,
        to: CLLocationCoordinate2D
    ) -> Double {
        let fromLocation = CLLocation(latitude: from.latitude, longitude: from.longitude)
        let toLocation = CLLocation(latitude: to.latitude, longitude: to.longitude)
        return fromLocation.distance(from: toLocation)
    }
}

extension LocationManager: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }
        
        self.location = LocationData(
            latitude: location.coordinate.latitude,
            longitude: location.coordinate.longitude,
            accuracy: location.horizontalAccuracy,
            timestamp: location.timestamp
        )
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Location error: \(error.localizedDescription)")
    }
    
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        authorizationStatus = manager.authorizationStatus
    }
}
