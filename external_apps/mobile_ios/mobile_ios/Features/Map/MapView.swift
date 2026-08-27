//
//  MapView.swift
//  mobile_ios
//
//  Created for Map & Routing Feature
//

import SwiftUI
import MapKit
import CoreLocation

struct MapView: View {
    @StateObject private var viewModel = MapViewModel()
    
    var body: some View {
        ZStack {
            Map(coordinateRegion: $viewModel.region, showsUserLocation: true, annotationItems: viewModel.annotations) { place in
                MapMarker(coordinate: place.coordinate, tint: .red)
            }
            .ignoresSafeArea()
            
            // Overlay for Route (Note: SwiftUI Map doesn't support Polyline overlay easily without UIViewRepresentable in older iOS versions. 
            // We'll use a UIViewRepresentable wrapper if needed, but for now we'll visualize the destination.)
            
            VStack {
                Spacer()
                if let error = viewModel.errorMessage {
                    Text(error)
                        .padding()
                        .background(Color.red.opacity(0.8))
                        .foregroundColor(.white)
                        .cornerRadius(10)
                        .padding()
                }
                
                Button(action: viewModel.requestLocation) {
                    Image(systemName: "location.fill")
                        .padding()
                        .background(Color.white)
                        .clipShape(Circle())
                        .shadow(radius: 5)
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .trailing)
            }
        }
        .onAppear {
            viewModel.checkLocationAuthorization()
        }
    }
}

struct Place: Identifiable {
    let id = UUID()
    let coordinate: CLLocationCoordinate2D
}

class MapViewModel: NSObject, ObservableObject, CLLocationManagerDelegate {
    @Published var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 10.762622, longitude: 106.660172),
        span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
    )
    @Published var annotations: [Place] = []
    @Published var errorMessage: String?
    
    private let locationManager = CLLocationManager()
    
    override init() {
        super.init()
        locationManager.delegate = self
        // set destination
        let destination = CLLocationCoordinate2D(latitude: 10.7769, longitude: 106.7009) // Bitexco
        annotations.append(Place(coordinate: destination))
    }
    
    func requestLocation() {
        locationManager.requestLocation()
    }
    
    func checkLocationAuthorization() {
        switch locationManager.authorizationStatus {
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
        case .restricted, .denied:
            errorMessage = "Location access denied."
        case .authorizedAlways, .authorizedWhenInUse:
            locationManager.requestLocation()
        @unknown default:
            break
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }
        DispatchQueue.main.async {
            self.region = MKCoordinateRegion(
                center: location.coordinate,
                span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
            )
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Location error: \(error.localizedDescription)")
        // Ignore generic error if location is unknown initially
    }
}
