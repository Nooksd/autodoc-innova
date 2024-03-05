import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../hooks/redux/reducers/userReducer.js";
import { setTheme } from "../hooks/redux/reducers/themeReducer.js";
import { fetchUserProfile } from "../hooks/redux/reducers/userReducer.js";
import { Home } from "../pages/home.jsx";
import { Document } from "../pages/document.jsx";
import { Config } from "../pages/config.jsx";
import { Login } from "../pages/login.jsx";
import { Welcome } from "../pages/welcome.jsx";
import { Splash } from "../pages/splash.jsx";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function Router() {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const [userToken, setUserToken] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Welcome");

  useEffect(() => {
    const getData = async () => {
      const savedUserToken = await AsyncStorage.getItem("@userToken");
      const savedTheme = await AsyncStorage.getItem("@theme");
      savedTheme
        ? dispatch(setTheme(savedTheme))
        : dispatch(setTheme(colorScheme));
      dispatch(setToken(savedUserToken));
      setUserToken(savedUserToken);
      setIsLoaded(true);
    };

    getData();
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      if (userToken) {
        dispatch(fetchUserProfile(userToken));
      }
    };

    getUserProfile();

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
        options={() => ({
          headerShown: false,
          animation: "none",
        })}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={() => ({
          headerShown: false,
          animation: "none",
        })}
      />
      <Stack.Screen
        name="MainTabs"
        options={{ headerShown: false }}
        component={MainTabs}
      />
    </Stack.Navigator>
  );
}

  const MainTabs = ({ route }) => {
  const theme = useSelector((state) => state.theme.theme);
  const styles = theme === "light" ? lightStyles : darkStyles;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: [styles.tabBar, route.params?.showTabBar && styles.noTabBar],
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarVisible: route.params?.showTabBar,
          tabBarShowLabel: false,
          headerShown: false,
          animation: "none",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              size={size}
              color={focused ? "#0099ff" : color}
              name={focused ? "home" : "home-outline"}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Document"
        component={Document}
        options={({ route }) => ({
          tabBarVisible: route.params?.showTabBar,
          tabBarShowLabel: false,
          headerShown: false,
          animation: "none",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              size={size}
              color={focused ? "#0099ff" : color}
              name={focused ? "document" : "document-outline"}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          animation: "none",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              size={size}
              color={focused ? "#0099ff" : color}
              name={focused ? "settings" : "settings-outline"}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const lightStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
  },
  noTabBar: {
    display: "none",
  }
});

const darkStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000",
  },
  noTabBar: {
    display: "none",
  }
});
