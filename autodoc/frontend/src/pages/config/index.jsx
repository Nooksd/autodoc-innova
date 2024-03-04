// login.jsx ->

// <----------------------------  // IMPORTS \\ ---------------------------->
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animatable,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../../hooks/https.js";
import DividerImage from "../../assets/divisor.png";
import ImageLogOut from "../../assets/logOut.svg";

const { width, height } = Dimensions.get("window");

// <----------------------------  // COMPONENTE \\ ---------------------------->
export function Config() {
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  const toggleConfig = () => setIsConfigOpen((previousState) => !previousState);

  const [image, setImage] = useState(
    "https://viaroteams.files.wordpress.com/2016/10/perfil-default.png"
  );
  const [name, setName] = useState("nome do usuàrio");

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@userToken");
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("@userToken");
      if (userToken) {
        const result = await http.get("/user/get-profile", {
          headers: {
            Authorization: `${userToken}`,
          },
        });

        setImage(result.data.user.user.avatar);
        setName(result.data.user.user.fullName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.ScrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.halfPage1}>
          <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
            <ImageLogOut animation="fadeInDown" style={styles.logOut} />
          </TouchableOpacity>
 
          <TouchableOpacity onPress={handleImagePicker}>
            <View style={styles.profile}>
              <Image
                animation="fadeInDown"
                source={{ uri: image }}
                style={styles.profileAvatar}
                resizeMode="cover"
              />

              <Text style={styles.name}>{name}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.halfPage2}>
          <Image source={DividerImage} style={styles.divisorImage} />
          {isConfigOpen ? (
            <>
          
            </>
          ) : (
            <>
              <TouchableOpacity onPress={toggleConfig} style={styles.voltar}>
                <Text>Voltar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// <----------------------------  // ESTILOS \\ ---------------------------->
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: width,
    height: 70,
    justifyContent: "center",
  },
  topButton: {
    marginTop: 100
  },
  voltar: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
  profile: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
    borderColor: "#fff",
    borderStyle: "dashed",
    borderWidth: 2,
  },
  profileAvatar: {
    width: 140,
    height: 140,
    borderRadius: 200,
    marginTop: 90,
    marginBottom: 10,
  },
  halfPage1: {
    flex: 1.5,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomStartRadius: 250,
  },
  halfPage2: {
    flex: 3,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  ScrollView: {
    height: "100%",
    width: "100%",
    background: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  divisorImage: {
    width: width,
    position: "absolute",
    top: -50,
    resizeMode: "contain",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonLogout: {
    position: "absolute",
    top: 50,
    left: 20,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 7,
    borderRadius: 0,
    // elevation: 10,
    backgroundColor: "#fff",
  },
  logOut: {
    width: 22,
    height: 22,
  },
});
