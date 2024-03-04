import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "../pages/home";
import { Document } from "../pages/documentCreator";
import { Config } from "../pages/config/maneger";
import { Login } from "../pages/login";
import { Welcome } from "../pages/welcome";
import { Ionicons } from "@expo/vector-icons";
import { Splash } from "../pages/splash";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function Router({ theme }) {
  const [userToken, setUserToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Welcome");

  useEffect(() => {
    const getData = async () => {
      const savedUserToken = await AsyncStorage.getItem("@userToken");
      setUserToken(savedUserToken);
      setIsLoaded(true);
    };

    getData();
  }, []);

  useEffect(() => {
    if (userToken !== "") {
      if (userToken !== null) {
        setInitialRoute("MainTabs");
      } else {
        setInitialRoute("Welcome");
      }
    }
  }, [userToken]);

  if (!isLoaded) return <Splash />;

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={options(false)}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{
          theme: theme,
        }}
        options={options(false)}
      />
      <Stack.Screen
        name="MainTabs"
        options={{ headerShown: false }}
        component={MainTabs}
      />
    </Stack.Navigator>
  );
}

const MainTabs = ({ selectedTheme }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{
          selectedTheme: selectedTheme,
        }}
        options={options(true, "home", "home-outline")}
      />
      <Tab.Screen
        name="Document"
        component={Document}
        initialParams={{
          selectedTheme: selectedTheme,
        }}
        options={options(true, "document", "document-outline")}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        initialParams={{
          selectedTheme: selectedTheme,
        }}
        options={options(true, "settings", "settings-outline")}
      />
    </Tab.Navigator>
  );
};

const options = (bol, icon1, icon2) => {
  if (bol) {
    return {
      tabBarShowLabel: false,
      headerShown: false,
      animation: "none",
      tabBarIcon: ({ focused, size, color }) => (
        <Ionicons
          size={size}
          color={focused ? "#0099ff" : color}
          name={focused ? icon1 : icon2}
        />
      ),
    };
  } else {
    return {
      headerShown: false,
      animation: "none",
    };
  }
};
