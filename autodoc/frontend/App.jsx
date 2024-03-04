import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { Router } from "./src/router/router.js";

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  const getData = async () => {
    const savedTheme = await AsyncStorage.getItem("@theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Router theme={theme} />
    </NavigationContainer>
  );
}
