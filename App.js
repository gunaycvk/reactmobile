import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, LogBox } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Navigation from "./src/navigation/Navigation";
import AuthProvider from "./src/context/AuthContext";

export default function App() {
  const [loading, setLoading] = useState(false);

  LogBox.ignoreLogs([
    "ReactImageView: Image source null doesn't exist",
    "SyntaxError: JSON Parse error: Unexpected character: u, js engine: hermes",
    "(ADVICE) 100 is not a valid dimension. Dimensions must be a number, auto, or a string suffixed with %",
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
    "The action 'GO_BACK' was not handled by any navigator.",
    "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
    "Require cycle: srcappDataSourcespageDataSource.js -> srcscreensMenuScreen.js -> srcappDataSourcespageDataSource.js",
  ]);

  if (process.env.NODE_ENV === "production") {
    LogBox.ignoreAllLogs(true); // Tüm uyarıları gizle
  } else {
    LogBox.ignoreAllLogs(false); // Tüm uyarıları gizle
  }

  const getLocalUserAutoLogin = async () => {
    try {
      setLoading(true);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocalUserAutoLogin();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  return (
    <ActionSheetProvider useCustomActionSheet={true}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ActionSheetProvider>
  );
}
