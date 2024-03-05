import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./src/router/router.js";
import store  from "./src/hooks/redux/store.js";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}
