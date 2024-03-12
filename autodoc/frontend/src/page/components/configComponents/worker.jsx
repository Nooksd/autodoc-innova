import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons, Fontisto, FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export function Worker() {
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  const toggleConfig = () => setIsConfigOpen((previousState) => !previousState);

  return (
    <>
      <TouchableOpacity onPress={toggleConfig} style={styles.goBack}>
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>

      <Text>{isConfigOpen ? "sim" : "não"}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  buttonListView: {
    marginTop: 50,
  },
  goBack: {
    alignItems: "center",
  },
  text: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#DDDDDD",
    marginBottom: 50,
  },
});
