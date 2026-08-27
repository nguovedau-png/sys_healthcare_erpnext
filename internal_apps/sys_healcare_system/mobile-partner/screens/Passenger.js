import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ActivityIndicator
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import apiKey from "../google_api_key.js";
import _ from "lodash";
import socketIO from "socket.io-client";
import BottomButton from "../components/BottomButton";

export default class Passenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookingForDelivery: false,
      deliveryIsOnTheWay: false,
      predictions: []
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000
    );
  }

  async onChangeDestination(destination) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${destination}&location=${this.props.latitude},${this.props.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        predictions: json.predictions
      });
    } catch (err) {
      console.error(err);
    }
  }

  async requestDelivery() {
    this.setState({ lookingForDelivery: true });
    var socket = socketIO.connect("http://192.168.1.8:8000");

    socket.on("connect", () => {
      console.log("Passenger Socket connected successfully: ", socket.connected);
      //Request a delivery!
      socket.emit("taxiRequest", this.props.routeResponse);
    });

    socket.on("driverLocation", driverLocation => {
      const pointCoords = [...this.props.pointCoords, driverLocation];
      this.map.fitToCoordinates(pointCoords, {
        edgePadding: { top: 140, bottom: 140, left: 20, right: 20 }
      });
      this.setState({
        lookingForDelivery: false,
        deliveryIsOnTheWay: true,
        deliveryLocation: driverLocation
      });
    });
  }

  render() {
    let marker = null;
    let getDelivery = null;
    let findingDeliveryActIndicator = null;
    let deliveryMarker = null;

    if (!this.props.latitude) return null;

    if (this.state.deliveryIsOnTheWay) {
      deliveryMarker = (
        <Marker coordinate={this.state.deliveryLocation}>
          <Image
            source={require("../images/delivery_logo.png")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        </Marker>
      );
    }

    if (this.state.lookingForDelivery) {
      findingDeliveryActIndicator = (
        <ActivityIndicator
          size="large"
          color="#10B981"
          animating={this.state.lookingForDelivery}
        />
      );
    }

    if (this.props.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.props.pointCoords[this.props.pointCoords.length - 1]}
        />
      );

      const distance = this.props.routeDetails?.distance?.text || "0 km";
      const duration = this.props.routeDetails?.duration?.text || "0 mins";

      // Simple fee calculation: Base 10,000 + 5,000 per km
      const distanceValue = this.props.routeDetails?.distance?.value || 0;
      const fee = 10000 + Math.round((distanceValue / 1000) * 5000);
      const formattedFee = fee.toLocaleString() + " VND";

      getDelivery = (
        <View style={styles.bottomContainer}>
          <View style={styles.routeDetailsBoard}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>EST. TIME</Text>
              <Text style={styles.detailValue}>{duration}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>DISTANCE</Text>
              <Text style={styles.detailValue}>{distance}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>FEE</Text>
              <Text style={styles.detailValue}>{formattedFee}</Text>
            </View>
          </View>
          <BottomButton
            onPressFunction={() => this.requestDelivery()}
            buttonText="CONFIRM DELIVERY 📦"
          >
            {findingDeliveryActIndicator}
          </BottomButton>
        </View>
      );
    }

    const predictions = this.state.predictions.map(prediction => (
      <TouchableHighlight
        onPress={async () => {
          const destinationName = await this.props.getRouteDirections(
            prediction.place_id,
            prediction.structured_formatting.main_text
          );
          this.setState({ predictions: [], destination: destinationName });
          this.map.fitToCoordinates(this.props.pointCoords, {
            edgePadding: { top: 20, bottom: 20, left: 20, right: 20 }
          });
        }}
        key={prediction.place_id}
      >
        <View>
          <Text style={styles.suggestions}>
            {prediction.structured_formatting.main_text}
          </Text>
        </View>
      </TouchableHighlight>
    ));

    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          onPress={async (e) => {
            const coordinate = e.nativeEvent.coordinate;
            const address = await this.props.reverseGeocode(coordinate.latitude, coordinate.longitude);
            await this.props.getRouteDirections(coordinate, address);
            this.setState({ destination: address });
            this.map.fitToCoordinates(this.props.pointCoords, {
              edgePadding: { top: 20, bottom: 20, left: 20, right: 20 }
            });
          }}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={this.props.pointCoords}
            strokeWidth={4}
            strokeColor="#10B981"
          />
          {marker}
          {deliveryMarker}
        </MapView>
        <TextInput
          placeholder="Enter delivery address..."
          style={styles.destinationInput}
          value={this.state.destination}
          clearButtonMode="always"
          onChangeText={destination => {
            this.setState({ destination });
            this.onChangeDestinationDebounced(destination);
          }}
        />
        {predictions}
        {getDelivery}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  suggestions: {
    backgroundColor: "white",
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
    marginLeft: 10,
    marginRight: 10
  },
  destinationInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 60,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingBottom: 20
  },
  routeDetailsBoard: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5
  },
  detailItem: {
    alignItems: "center",
    flex: 1
  },
  detailLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.5
  },
  detailValue: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "600"
  }
});
