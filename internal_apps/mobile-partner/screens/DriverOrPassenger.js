import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";

export default class DriverOrPassenger extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.handleChange("isDriver", true)}
          style={[styles.choiceContainer, { borderBottomWidth: 1, borderBottomColor: "#E5E7EB" }]}
        >
          <Text style={styles.choiceText}>I'm a Delivery Partner</Text>
          <Image
            source={require("../images/delivery_partner_icon.png")}
            style={styles.selectionImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.handleChange("isPassenger", true)}
          style={styles.choiceContainer}
        >
          <Text style={styles.choiceText}>I'm a Pharmacy</Text>
          <Image
            source={require("../images/pharmacy_icon.png")}
            style={styles.selectionImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  choiceText: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center"
  },
  choiceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  selectionImage: {
    height: 180,
    width: 180
  }
});
