import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Dimensions } from "react-native";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { ButtonHighlightDark, TextName } from "../../../assets/css/themeStyles.js";
import * as Animatable from "react-native-animatable";

import { GeneralConfig } from "./pageOptions/generalConfig.jsx";
import { Users } from "./pageOptions/users.jsx";
import { AddUser } from "./pageOptions/addUser.jsx";
import { Favorites } from "./pageOptions/favorites.jsx";

const { width, height } = Dimensions.get("window");

export function Maneger() {
  const theme = useSelector((state) => state.theme.theme);
  let color = theme === "light" ? "black" : "white";

  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [isAddUserOpen, setIsAddUserOpen] = useState(true);
  const [isWorkersOpen, setIsWorkersOpen] = useState(true);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(true);

  const toggleConfig = () => {
    setIsConfigOpen((previousState) => !previousState);
  };
  const toggleAddUser = () => {
    setIsAddUserOpen((previousState) => !previousState);
  };
  const toggleUsers = () => {
    setIsWorkersOpen((previousState) => !previousState);
  };
  const toggleFavorites = () => {
    setIsFavoritesOpen((previousState) => !previousState);
  };

  if (!isWorkersOpen) return <Users triggerToggle={toggleUsers} />;
  if (!isAddUserOpen) return <AddUser triggerToggle={toggleAddUser} />;
  if (!isFavoritesOpen) return <Favorites triggerToggle={toggleFavorites} />;
  if (!isConfigOpen) return <GeneralConfig triggerToggle={toggleConfig} />;

  return (
    <Animatable.View 
    animation="fadeInUp"
    style={styles.buttonListView}>
      <ButtonHighlightDark
        underlayColor="rgba(10, 60, 97, 0.5)"
        onPress={toggleUsers}
        style={styles.button}
      >
        <View style={styles.buttonContent}>
          <FontAwesome
            style={styles.iconStyle}
            name="user"
            size={24}
            color={color}
          />
          <TextName>Perfil dos Usuários</TextName>
        </View>
      </ButtonHighlightDark>

      <ButtonHighlightDark
        underlayColor="rgba(10, 60, 97, 0.5)"
        onPress={toggleAddUser}
        style={styles.button}
      >
        <View style={styles.buttonContent}>
          <FontAwesome
            style={styles.iconStyle}
            name="user"
            size={24}
            color={color}
          />
          <TextName>Adicionar funcionários</TextName>
        </View>
      </ButtonHighlightDark>

      <ButtonHighlightDark
        underlayColor="rgba(10, 60, 97, 0.5)"
        onPress={toggleFavorites}
        style={styles.button}
      >
        <View style={styles.buttonContent}>
          <Fontisto name="favorite" size={24} color={color} />
          <TextName>Favoritos</TextName>
        </View>
      </ButtonHighlightDark>

      <ButtonHighlightDark
        underlayColor="rgba(10, 60, 97, 0.5)"
        onPress={toggleConfig}
        style={styles.button}
      >
        <View style={styles.buttonContent}>
          <FontAwesome name="gear" size={24} color={color} />
          <TextName>Configurações</TextName>
        </View>
      </ButtonHighlightDark>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  buttonListView: {
    marginTop: 50,
  },
  button: {
    alignItems: "baseline",
    // paddingLeft: 100,
    width: 400,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  buttonContent: {
    alignItems: "center",

  },
  goBack: {
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 50,
  },
});
