import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";

export default class LoginForm extends Component {
  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#9CA3AF"
          value={this.props.email}
          onChangeText={email => this.props.handleChange("email", email)}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={this.props.password}
          onChangeText={pw => this.props.handleChange("password", pw)}
        />
        <TouchableOpacity
          onPress={this.props.handleSignIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 15,
    backgroundColor: "#F3F4F6",
    color: "#111827",
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600"
  }
});
