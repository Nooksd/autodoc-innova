import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Dimensions, Switch, KeyboardAvoidingView } from "react-native";
import { ButtonHighlightDark, TextName, InputsText, ViewDark } from "../../../../assets/css/themeStyles.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from "react-native-animatable";
const { width, height } = Dimensions.get("window");

export function AddUser({ triggerToggle }) {
  const theme = useSelector((state) => state.theme.theme);
  
  function trigger() {
    triggerToggle()
  }
  return (
    <>
      <Animatable.View animation="fadeInUp" style={{width: "100%", height: "100%", alignItems: "center", justifyContent:"center"}}>
      <ViewDark style= {styles.inputContent}>
     <InputsText
     placeholderTextColor="#2e2e2e" 
      placeholder="Nome"
      />
      </ViewDark>


      <ViewDark style= {styles.inputContent}>
     <InputsText
     placeholderTextColor="#2e2e2e"
      placeholder="Sobrenome"
      />
      </ViewDark>


      <ViewDark style= {styles.inputContent}>
     <InputsText
     placeholderTextColor="#2e2e2e"
      placeholder="Email"
      />
      </ViewDark>


      <ViewDark style= {styles.inputContent}>
     <InputsText
     placeholderTextColor="#2e2e2e"
      placeholder="Senha"
      />
      </ViewDark>

      <ButtonHighlightDark onPress={trigger} style={styles.Cancelar}>
        <TextName>Cancelar</TextName>
      </ButtonHighlightDark>
      <ButtonHighlightDark onPress={trigger} style={styles.Criar}>
        <TextName>Criar</TextName>
      </ButtonHighlightDark>
      </Animatable.View>
    </>
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
  inputContainer: {
    width: '100%',
    alignItems: "center",
  },
  inputContent: {
    width: "97%",
    height: 60,
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    top: -30,
  },
  Cancelar: {
    position: "absolute",
    borderRadius: 10,
    padding: 10,
    right: 70,
    bottom: 150,
  },
  Criar: {
    position: "absolute",
    borderRadius: 10,
    padding: 10,
    right: 10,
    bottom: 150,
  },
});
