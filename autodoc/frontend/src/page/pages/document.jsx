import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert, Text, StyleSheet } from "react-native";
import { WriteData } from "../components/docComponents/writeData";
import { useSelector } from "react-redux";

export function DocumentCreator() {
  const [writeFile, setWriteFile] = useState(false);
  const templates = useSelector((state) => state.template.templates);

  const [docName, setDocName] = useState("");
  const [docLink, setDocLink] = useState("");

  const handleWriteData = (docName, docLink) => {
    setDocName(docName);
    setDocLink(docLink);
    setWriteFile(true);
  };

  if (writeFile) return <WriteData docLink={docLink} docName={docName} />;

  return (
    <View style={styles.container}>
      {Object.keys(templates).map((key) => (
        <TouchableOpacity
          key={key}
          style={styles.button}
          onPress={() =>
            handleWriteData(templates[key].name, templates[key].link)
          }
        >
          <Text style={styles.text}>
            {`Criar ${templates[key].title}`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "baseline",
  },
  button: {
    width: "80%",
    height: 130,
    backgroundColor: "red",
    borderRadius: 15,
    alignItems: "baseline",
    padding: 15,
    justifyContent: "center",
    marginBottom: 25,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 4,
    borderColor: "#000",
  },
  text: {
    color: "black",
    textAlign: "center",
  },
})