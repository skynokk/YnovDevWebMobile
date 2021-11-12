import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import logo from "./assets/icon.png";
import { Home } from "./pages";
import Detail from "./pages/Detail";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => SplashScreen.hideAsync(), 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
      <StatusBar style="light" backgroundColor="#000000" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
