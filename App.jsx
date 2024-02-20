import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackRouter } from "./src/router/router.js";

export default function App() {
  return (
    <NavigationContainer>
      <StackRouter />
    </NavigationContainer>
  )
}
