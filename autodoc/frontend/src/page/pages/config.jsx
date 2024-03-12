// manegerConfig.jsx ->

// <----------------------------  // IMPORTS \\ ---------------------------->
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../hooks/redux/reducers/userReducer.js";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import { ContainerConfig, TextName } from "../../assets/css/themeStyles.js";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../../hooks/https.js";
import DividerImage from "../../assets/images/divisor.png";
import { Ionicons } from "@expo/vector-icons";
import { Maneger } from "../components/configComponents/maneger.jsx";
import { Worker } from "../components/configComponents/worker.jsx";
import { ThemeProvider } from "styled-components/native";
import themes from "../../theme/index.js";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

// <----------------------------  // COMPONENTE \\ ---------------------------->
export function Config() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  let selectedTheme = theme === "light" ? themes.light : themes.dark;

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [name, setName] = useState("nome do usuàrio");
  const [userToken, setUserToken] = useState("");
  const [image, setImage] = useState(
    "https://viaroteams.files.wordpress.com/2016/10/perfil-default.png"
  );

  const userData = useSelector((state) => state.userData);
  const {
    userName,
    userAvatar,
    userToken: reduxUserToken,
    userManeger,
  } = userData;

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsImageChanged(true);
    }
  };

  const navigation = useNavigation();



  const handleSubmit = async () => {
    try {
      setIsImageLoading(true);

      if (userToken) {
        const formData = new FormData();
        formData.append("profile", {
          uri: image,
          name: "profile",
          type: "image/jpeg",
        });

        const response = await http.post("/user/upload-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${userToken}`,
          },
          timeout: 10000,
        });

        setIsImageChanged(false);
        setIsImageLoading(false);
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      setIsImageLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchUserProfile(userToken))

    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, [dispatch, userToken]);

  useEffect(() => {
    if (reduxUserToken) {
      setUserToken(reduxUserToken);
    }
    if (userName) {
      setName(userName);
    }
    if (userAvatar) {
      setImage(userAvatar);
    }
    setRefreshing(false);
  }, [reduxUserToken, userName, userAvatar]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <ContainerConfig style={styles.container}>
        <ScrollView
          contentContainerStyle={{ height: "100%", width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Animatable.View
          animation="fadeInUp"
          style={styles.halfPage1}>

            {isImageChanged && (
              <TouchableHighlight
                underlayColor="rgba(10, 60, 97, 0.5)"
                onPress={handleSubmit}
                style={styles.buttonSubmit}
              >
                <Text style={{ color: "#fff" }}>Salvar</Text>
              </TouchableHighlight>
            )}

            <View style={styles.profile}>
              <TouchableOpacity onPress={handleImagePicker}>
                {isImageLoading && (
                  <ActivityIndicator
                    size="30"
                    style={{
                      position: "absolute",
                      zIndex: 999,
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                )}
                <View
                  style={
                    isImageLoading && {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 998,
                      borderRadius: 200,
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    }
                  }
                />
                <Image
                  animation="fadeInDown"
                  source={{ uri: image }}
                  style={styles.profileAvatar}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TextName style={styles.name}>{name}</TextName>
            </View>
          </Animatable.View>
          <View style={styles.halfPage2}>
            <Animatable.Image animation="fadeInUp" source={DividerImage} style={styles.divisorImage} />
            {userManeger === null ? (
              <Maneger theme={theme} />
            ) : (
              <Worker theme={theme} />
            )}
          </View>
        </ScrollView>
      </ContainerConfig>
    </ThemeProvider>
  );
}

// <----------------------------  // ESTILOS \\ ---------------------------->
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  halfPage1: {
    width: width,
    height: height * 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  halfPage2: {
    width: width,
    height: height * 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  divisorImage: {
    width: width,
    position: "absolute",
    top: -50,
    resizeMode: "contain",
    zIndex: 99,
  },
  buttonSubmit: {
    position: "absolute",
    top: 50,
    right: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#003d9e",
  },
  profile: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
    position: "absolute",
  },
  profileAvatar: {
    width: 140,
    height: 140,
    borderRadius: 200,
  },
  name: {
    fontSize: 20,
    top: 40,
    fontWeight: "bold",
  },
  buttonListView: {
    marginTop: 50,
  },
  button: {
    alignItems: "baseline",
    backgroundColor: "#fff",
    paddingLeft: 70,
    width: width,
    height: 80,
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
  },
  iconStyle: {
    position: "absolute",
    top: 0,
    left: 20,
  },
  goBack: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
});
