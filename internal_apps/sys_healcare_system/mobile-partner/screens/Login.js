import React, { Component } from "react";
import { Text, StyleSheet, View, Platform, Alert, Image } from "react-native";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import baseUrl from "../baseUrl";
axios.defaults.baseURL = baseUrl;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  async handleSignUp() {
    try {
      const { email, password } = this.state;
      await axios.post("/auth/register", { email, password });
      this.handleSignIn();
    } catch (error) {
      this.setState({ errorMessage: error.response.data.message });
    }
  }

  async handleSignIn() {
    try {
      this.setState({ errorMessage: "" });
      const { email, password } = this.state;
      const result = await axios.post("/auth/login", { email, password });
      this.props.handleChange("token", result.data.token);
    } catch (error) {
      this.setState({ errorMessage: error.response.data.message });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MediRide Partner</Text>
          <Text style={styles.subHeaderText}>Healthcare Logistics</Text>
        </View>
        <LoginForm
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          handleSignIn={this.handleSignIn}
          handleSignUp={this.handleSignUp}
        />
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        <Image
          source={require("../images/delivery_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20
  },
  header: {
    marginTop: 80,
    marginBottom: 40,
    alignItems: "center"
  },
  errorMessage: {
    marginVertical: 10,
    fontSize: 14,
    color: "#EF4444",
    textAlign: "center"
  },
  headerText: {
    fontSize: 32,
    color: "#111827",
    fontWeight: "800",
    marginBottom: 5
  },
  subHeaderText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500"
  },
  logo: {
    height: 200,
    width: "100%",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 40
  }
});
