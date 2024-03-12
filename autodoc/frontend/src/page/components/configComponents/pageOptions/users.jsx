import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Dimensions, Switch } from "react-native";
import { ButtonHighlightDark, TextName } from "../../../../assets/css/themeStyles.js";

const { width, height } = Dimensions.get("window");

export function Users({ triggerToggle }) {
  const theme = useSelector((state) => state.theme.theme);

  function trigger() {
    triggerToggle()
  }
  return (
    <>
      <ButtonHighlightDark onPress={trigger} style={styles.goBack}>
        <TextName>Voltar funcionarios</TextName>
      </ButtonHighlightDark>
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
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 50,
  },
});
