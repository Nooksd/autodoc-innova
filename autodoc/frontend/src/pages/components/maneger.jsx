import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { Ionicons, Fontisto, FontAwesome } from "@expo/vector-icons";
import { ButtonConfig, TextName } from "../../assets/css/themeStyles.js";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export function Maneger({ theme }) {
  const color = theme === "light" ? "black" : "white";
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  const navigation = useNavigation();
  const toggleConfig = () => {
    navigation.navigate('Config', { showTabBar: false });

    setIsConfigOpen((previousState) => !previousState);
  };

  if (isConfigOpen) {
    return (
      <View style={styles.buttonListView}>
        <ButtonConfig
          underlayColor="rgba(10, 60, 97, 0.5)"
          onPress={toggleConfig}
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
        </ButtonConfig>

        <ButtonConfig
          underlayColor="rgba(10, 60, 97, 0.5)"
          onPress={toggleConfig}
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
        </ButtonConfig>

        <ButtonConfig
          underlayColor="rgba(10, 60, 97, 0.5)"
          onPress={toggleConfig}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Fontisto name="favorite" size={24} color={color} />
            <TextName>Favoritos</TextName>
          </View>
        </ButtonConfig>

        <ButtonConfig
          underlayColor="rgba(10, 60, 97, 0.5)"
          onPress={toggleConfig}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="gear" size={24} color={color} />
            <TextName>Configurações</TextName>
          </View>
        </ButtonConfig>
      </View>
    );
  }
  return (
    <ButtonConfig onPress={toggleConfig} style={styles.goBack}>
      <TextName>Voltar</TextName>
    </ButtonConfig>
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
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 50,
  },
});
