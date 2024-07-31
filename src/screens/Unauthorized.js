import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const Unauthorized = () => {
  const navigation = useNavigation();
  const [_, setUser] = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <Text>You are not authorized to access this page.</Text>
      <Button
        style={{ marginBottom: 15 }}
        title="Go Home"
        onPress={() => {
          navigation.navigate("Home", {
            screen: "home",
          });
        }}
      />
      <Button
        title="Logout"
        onPress={() => {
          setUser({ type: "LOGOUT" });
        }}
      />
    </View>
  );
};

export default Unauthorized;
