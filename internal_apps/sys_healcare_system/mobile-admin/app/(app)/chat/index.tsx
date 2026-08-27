import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function ChatIndexScreen() {
  const router: any = useRouter();

  useEffect(() => {
    // Redirect to join screen
    router.replace("/chat/join");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading chat...</Text>
    </View>
  );
}