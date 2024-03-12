import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../../hooks/redux/reducers/themeReducer.js";
import { StyleSheet, Dimensions, Switch, Text, TextInput,TouchableOpacity } from "react-native";
import {
  ButtonHighlightDark,
  TextName,
  ViewDark,
  InputsText,
  
} from "../../../../assets/css/themeStyles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";


const { width, height } = Dimensions.get("window");

export function GeneralConfig({ triggerToggle }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleTheme = () => {
    try {
      setIsEnabled((previousState) => !previousState);
      dispatch(setTheme(theme === "light" ? "dark" : "light"));
    } catch (err) {
      console.log(err);
    }
  };

  async function saveTheme(theme) {
    await AsyncStorage.setItem("@theme", theme);
  }

  function trigger() {
    triggerToggle();
  }

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  // --------------------------
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
  const [counter, setCounter] = useState(2);

  const handleAddInput = () => {
    // Adiciona um novo input apenas se houver menos de 3 inputs atualmente
    if (inputs.length < 3) {
      const newInputs = [{ id: counter, value: "" }, ...inputs];
      setInputs(newInputs);
      setCounter(counter + 1);
    }
  };

  const handleInputChange = (id, text) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, value: text } : input
    );
    setInputs(updatedInputs);
  };

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@userToken");
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  return (
    <Animatable.View animation={"fadeInUp"} style={{width: "100%", height: "100%", alignItems: "center"}}>


    <>
      <ButtonHighlightDark onPress={trigger} style={styles.goBack}>
        <TextName>Voltar</TextName>
      </ButtonHighlightDark>

      <ViewDark style={styles.buttonMode}>
        <>
          <TextName>{isEnabled ? "Dark Mode" : "Dark Mode"}</TextName>
          <Switch
            trackColor={{ false: "#2e2e2e", true: "#2e2e2e" }}
            thumbColor={isEnabled ? "#000" : "#fff"}
            onValueChange={toggleTheme}
            value={isEnabled}
          />
        </>

      </ViewDark>

      <>
      <View style={styles.buttonLogout}>
          <TouchableOpacity 
            underlayColor="rgba(10, 60, 97, 0.5)"
            onPress={handleLogout}
            style={{flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems:"center"}}
            >
            <Text style={{color: "#fff"}}>Deslogar</Text>
            <Ionicons name="exit-outline" size={25} color={"#fff"} />

          </TouchableOpacity>
      </View>

        </>
    </>
    </Animatable.View>

  );
}

const styles = StyleSheet.create({
  buttonListView: {
    marginTop: 50,
  },
  button: {
    alignItems: "baseline",
    paddingLeft: 100,
    width: width,
    height: 80,
    justifyContent: "center",
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  goBack: {
    position: "absolute",
    borderRadius: 10,
    padding: 10,
    left: 7,
    top: 170,
  },
  buttonMode: {
    width: "97%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    position: "absolute",
    top: 230,
  },
  buttonLogout: {
    width: "25%",
    height: "7%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    bottom: "8%",
    padding: 10,
    backgroundColor: "#BA0000",
    borderRadius: 10,
  },
});
