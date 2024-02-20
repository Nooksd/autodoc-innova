import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../pages/home";
import { Document } from "../pages/documentCreator";
import { Config } from "../pages/config";
import { Ionicons } from "@expo/vector-icons";
import { Login } from "../pages/login";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomRouter() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused)
              return <Ionicons sise={size} color={color} name="home" />;
            return <Ionicons sise={size} color={color} name="home-outline" />;
          },
        }}
      />
      <Tab.Screen
        name="Document"
        component={Document}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused)
              return <Ionicons sise={size} color={color} name="document" />;
            return (
              <Ionicons sise={size} color={color} name="document-outline" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused)
              return <Ionicons sise={size} color={color} name="settings" />;
            return (
              <Ionicons sise={size} color={color} name="settings-outline" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export function StackRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="main-tabs"
        component={BottomRouter}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
