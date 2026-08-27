import React, { useState } from "react";
import { View, TextInput, Image, Button, Platform, KeyboardAvoidingView } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";

export default function JoinScreen() {
  const dispatch = useDispatch();
  const router: any = useRouter();
  const [username, setUsername] = useState("");
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../../../assets/images/chat-icon.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          onChangeText={text => setUsername(text)}
          value={username}
          style={{ fontSize: 30, textAlign: "center" }}
          placeholder="Enter username"
        />
        <Button
          title="Join Chat"
          onPress={() => {
            dispatch({ type: "server/join", data: username });
            router.push("/chat/friends");
          }}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" />
    </View>
  );
}