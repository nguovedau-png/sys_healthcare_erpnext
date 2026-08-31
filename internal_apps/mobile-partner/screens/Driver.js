import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Linking,
  Platform,
  Alert,
  Text,
  TouchableOpacity
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import BottomButton from "../components/BottomButton";
import socketIO from "socket.io-client";
// import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import BackgroundGeolocation, {
  Location,
  Subscription
} from "react-native-background-geolocation";

export default class Driver extends Component {
  subscriptions: Subscription[] = [];
  state: any = {};

  constructor(props) {
    super(props);
    this.state = {
      lookingForOrders: false,
      enabled: false,
      location: ''
    };
    this.acceptOrderRequest = this.acceptOrderRequest.bind(this);
    this.findOrders = this.findOrders.bind(this);
    this.socket = null;
  }

  componentDidMount() {
    // ... existing subscription code (commented or active as per original)
  }

  componentWillUnmount() {
    this.subscriptions.forEach((subscription) => subscription.remove());
  }

  onToggleEnabled(value) {
    console.log('[onToggleEnabled]', value);
    this.setState({ enabled: value })
    if (value) {
      BackgroundGeolocation.start();
    } else {
      this.setState({ location: '' });
      BackgroundGeolocation.stop();
    }
  }

  findOrders() {
    if (!this.state.lookingForOrders) {
      this.setState({ lookingForOrders: true });

      this.socket = socketIO.connect("http://192.168.1.8:8000"); // Updated to machine IP for dev

      this.socket.on("connect", () => {
        console.log("Driver Socket connected successfully: ", this.socket.connected);
        this.socket.emit("passengerRequest"); // Keep event name for backend compatibility
      });

      this.socket.on("taxiRequest", async routeResponse => {
        this.setState({
          lookingForOrders: false,
          orderFound: true,
          routeResponse
        });
        await this.props.getRouteDirections(
          routeResponse.geocoded_waypoints[0].place_id
        );
        this.map.fitToCoordinates(this.props.pointCoords, {
          edgePadding: { top: 140, bottom: 140, left: 20, right: 20 }
        });
      });
    }
  }

  acceptOrderRequest() {
    const passengerLocation = this.props.pointCoords[
      this.props.pointCoords.length - 1
    ];

    BackgroundGeolocation.on("location", location => {
      this.socket.emit("driverLocation", {
        latitude: location.latitude,
        longitude: location.longitude
      });
    });

    BackgroundGeolocation.getState().then(state => {
      if (!state.enabled) {
        BackgroundGeolocation.start();
      }
    });

    if (Platform.OS === "ios") {
      Linking.openURL(
        `http://maps.apple.com/?daddr=${passengerLocation.latitude},${passengerLocation.longitude
        }`
      );
    } else {
      Linking.openURL(
        `geo:0,0?q=${passengerLocation.latitude},${passengerLocation.longitude
        }(Pharmacy)`
      );
    }
  }

  render() {
    let endMarker = null;
    let startMarker = null;
    let findingOrderActIndicator = null;
    let orderSearchText = "FIND ORDERS 📦";
    let bottomButtonFunction = this.findOrders;

    if (!this.props.latitude) return null;

    if (this.state.lookingForOrders) {
      orderSearchText = "FINDING ORDERS...";
      findingOrderActIndicator = (
        <ActivityIndicator
          size="large"
          color="#10B981"
          animating={this.state.lookingForOrders}
        />
      );
    }

    let orderDetailsBoard = null;

    if (this.state.orderFound) {
      orderSearchText = "ACCEPT ORDER ✅";
      bottomButtonFunction = this.acceptOrderRequest;

      const distance = this.props.routeDetails?.distance?.text || "Calculating...";
      const distanceValue = this.props.routeDetails?.distance?.value || 0;
      const earnings = 8000 + Math.round((distanceValue / 1000) * 4000);
      const formattedEarnings = earnings.toLocaleString() + " VND";

      orderDetailsBoard = (
        <View style={styles.orderDetailsBoard}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>DISTANCE</Text>
            <Text style={styles.detailValue}>{distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>POTENTIAL EARNINGS</Text>
            <Text style={styles.detailValue}>{formattedEarnings}</Text>
          </View>
        </View>
      );
    }

    if (this.props.pointCoords.length > 1) {
      endMarker = (
        <Marker
          coordinate={this.props.pointCoords[this.props.pointCoords.length - 1]}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../images/pharmacy_icon.png")}
          />
        </Marker>
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
          region={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={this.props.pointCoords}
            strokeWidth={4}
            strokeColor="#10B981"
          />
          {endMarker}
          {startMarker}
        </MapView>
        <View style={styles.bottomContainer}>
          {orderDetailsBoard}
          <BottomButton
            onPressFunction={bottomButtonFunction}
            buttonText={orderSearchText}
          >
            {findingOrderActIndicator}
          </BottomButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  orderDetailsBoard: {
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
