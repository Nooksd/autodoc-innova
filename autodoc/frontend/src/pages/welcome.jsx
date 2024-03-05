import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export function Welcome() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#0A3C61"
        barStyle="light-content"
        translucent={false}
      />

      <ImageBackground
        source={require("../assets/images/splash.png")}
        style={styles.background}
      >
        <View>
          <Animatable.Image
            animation="fadeInDown"
            source={require("../assets/images/logo.png")}
            style={styles.containerLogo}
            resizeMode="contain"
          />
        </View>

        <Animatable.View animation="fadeInUp" delay={300}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Acessar
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    width: 300,
    height: 100,
    marginTop: 70,
  },
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 380,
    height: 50,
    backgroundColor: "#0A3C61",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
  },
});
