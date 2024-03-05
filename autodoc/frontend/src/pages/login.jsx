// login.jsx ->

// <----------------------------  // IMPORTS \\ ---------------------------->
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../hooks/redux/reducers/userReducer.js";
import { fetchUserProfile } from "../hooks/redux/reducers/userReducer.js";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import { Container, Button } from "../assets/css/themeStyles.js";
import WavesLightSvg from "../assets/images/waves-light.svg";
import WavesDarkSvg from "../assets/images/waves-dark.svg";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
} from "react-native";
import { ThemeProvider } from "styled-components/native";
import themes from "../theme/index.js";
import http from "../hooks/https.js";

const { width, height } = Dimensions.get("window");

// <----------------------------  // COMPONENTE \\ ---------------------------->
export function Login() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); 
  let selectedTheme = theme === "light" ? themes.light : themes.dark;

  // parametros de tema

  // declaração para uso
  const navigation = useNavigation();

  // declaração de estados dinânicos
  const [emailInputError, setEmailInputError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [inputFocus, setInputFocus] = useState("email");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // <----------------------------  // FUNÇÕES \\ ---------------------------->
  // Função para salvar o token do usuário no AsyncStorage
  const saveUserToken = async (token) => {
    await AsyncStorage.setItem("@userToken", token);
  };

  // Função para verificar se o email inserido é válido
  const emailFieldValidaor = () => {
    const verify = String(userInfo.email)
      .toLocaleLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (verify === null) {
      return false;
    }
    return true;
  };

  // Função para verificar se a senha inserida é válida
  const passwordFieldValidaor = () => {
    if (userInfo.password.length < 5 || userInfo.password.length > 15) {
      return false;
    }
    return true;
  };

  // Função para manipular a alteração de texto nos campos de entrada
  const hanleChangeText = async (value, field) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  // Função para manipular o clique no botão de login
  const handleButtonClik = async () => {
    let valitationResult = emailFieldValidaor();
    if (valitationResult) valitationResult = passwordFieldValidaor();

    if (valitationResult) {
      try {
        const response = await http.post("/user/verify", userInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status) {
          try {
            dispatch(setToken(response.data.token));
            dispatch(fetchUserProfile(response.data.token));
            saveUserToken(response.data.token);
            navigation.reset({
              index: 3,
              routes: [{ name: "MainTabs" }],
            })
          } catch (e) {
            setEmailError("");
            setPasswordError("");
            setEmailInputError(true);
            setPasswordInputError(true);
            console.error(e);

            setTimeout(() => {
              setEmailInputError(false);
              setPasswordInputError(false);
            }, 500);
          }
        }
      } catch (err) {
        setEmailError("");
        setPasswordError("");
        setEmailInputError(true);
        setPasswordInputError(true);

        setTimeout(() => {
          setEmailInputError(false);
          setPasswordInputError(false);
        }, 500);
      }
    } else {
      setInputFocus("");
      setUserInfo(userInfo);
    }
  };

  // <----------------------------  // VALIDAÇÃO DE CAMPOS \\ ---------------------------->
  useEffect(() => {
    if (userInfo.email !== "") {
      const emailVerify = emailFieldValidaor();

      if (!emailVerify) {
        setEmailInputError(true);
        setEmailError("email inserido inválido");
      } else setEmailInputError(false);
    } else setEmailInputError(false);

    if (inputFocus === "email") setEmailInputError(false);

    if (userInfo.password !== "") {
      const passwordVerify = passwordFieldValidaor();

      if (!passwordVerify) {
        setPasswordInputError(true);
        setPasswordError("senha inserida inválida");
      } else setPasswordInputError(false);
    } else setPasswordInputError(false);

    if (inputFocus === "password") setPasswordInputError(false);
  }, [userInfo, inputFocus]);

  // <----------------------------  // RENDERIZAÇÃO DO COMPONENTE \\ ---------------------------->
  return (
    <ThemeProvider theme={selectedTheme}>
      <Container style={styles.container} height={height} width={width}>
        <StatusBar
          backgroundColor="#003254"
          barStyle="light-content"
          translucent={false}
        />

        <View style={styles.halfPage1}>
          <Animatable.Image
            animation="fadeInDown"
            source={require("../assets/images/logo.png")}
            style={styles.containerLogo}
          />
        </View>

        <Animatable.View
          animation="fadeInUp"
          delay={300}
          style={[styles.halfPage2]}
        >
          {theme === "light" ? (
            <WavesLightSvg width={width + 1} style={styles.waves} />
          ) : (
            <WavesDarkSvg width={width + 1} style={styles.waves} />
          )}

          <Text style={styles.errorText}>
            {emailInputError ? emailError : null}
          </Text>

          <TextInput
            style={[styles.input, emailInputError ? styles.inputError : ""]}
            value={userInfo.email}
            onChangeText={(value) => hanleChangeText(value, "email")}
            onFocus={() => setInputFocus("email")}
            autoCapitalize="none"
            placeholder="exemplo@gmail.com"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />

          <Text style={styles.errorText}>
            {passwordInputError ? passwordError : null}
          </Text>

          <TextInput
            style={[styles.input, passwordInputError ? styles.inputError : ""]}
            value={userInfo.password}
            onChangeText={(value) => hanleChangeText(value, "password")}
            onFocus={() => setInputFocus("password")}
            secureTextEntry
            autoCapitalize="none"
            placeholder="********"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />

          <Button style={styles.button} onPress={handleButtonClik}>
            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
              Entrar
            </Text>
          </Button>
        </Animatable.View>
      </Container>
    </ThemeProvider>
  );
}

// <----------------------------  // ESTILOS \\ ---------------------------->
const styles = StyleSheet.create({
  halfPage1: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  halfPage2: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  waves: {
    position: "absolute",
    bottom: -715,
    fill: "#fff",
  },
  containerLogo: {
    width: 400,
    top: 0,
    height: 100,
  },
  input: {
    width: 370,
    height: 50,
    borderRadius: 0,
    marginBottom: 10,
    borderBottomWidth: 1.0,
    borderBottomColor: "#FFF",
    top: -90,
    color: "#FFF",
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
  },
  inputError: {
    borderBottomColor: "red",
    marginTop: 0,
  },
  errorText: {
    width: width,
    color: "red",
    fontSize: 15,
    top: -75,
    textAlign: "right",
    paddingRight: 70,
  },
});
