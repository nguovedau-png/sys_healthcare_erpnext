import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";

export default function ChatScreen() {
  const dispatch = useDispatch();
  const { userId } = useLocalSearchParams();
  const selfUser = useSelector((state: any) => state.selfUser);
  const conversations = useSelector((state: any) => state.conversations);
  const messages = conversations[userId as string] ? conversations[userId as string].messages : [];

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={messages => {
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: userId }
          });
          dispatch({
            type: "server/private_message",
            data: { message: messages[0], conversationId: userId }
          });
        }}
        user={{
          _id: selfUser.userId
        }}
      />
      {Platform.OS === "android" && (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={80}
        />
      )}
    </View>
  );
}