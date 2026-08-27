import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

export default function FriendListScreen() {
  const router: any = useRouter();
  const usersOnline = useSelector((state: any) => state.usersOnline);
  const { itemContainerStyle, avatarImgStyle, avatarNameViewStyle } = styles;
  
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={usersOnline}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "chat/messages",
                  params: { userId: item.userId.toString() }
                })
              }
            >
              <View style={itemContainerStyle}>
                <Image style={avatarImgStyle} source={{ uri: item.avatar }} />
                <View style={avatarNameViewStyle}>
                  <Text style={{ fontSize: 20 }}>{item.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.userId.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: { flex: 1, flexDirection: "row" },
  avatarImgStyle: { width: 100, height: 100, borderRadius: 50 },
  avatarNameViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});