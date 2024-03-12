import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

export function WriteData({ docLink, docName}) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [cidade, setCidade] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [supervisor, setSupervisor] = useState("");

  const handleFillDocument = async () => {};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Digite seu nome..."
        value={nome}
        onChangeText={(text) => setNome(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 20,
          width: 300,
        }}
      />
      <TextInput
        placeholder="Digite a data..."
        value={data}
        onChangeText={(text) => setData(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 20,
          width: 300,
        }}
      />
      <TextInput
        placeholder="Digite o local..."
        value={local}
        onChangeText={(text) => setLocal(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 20,
          width: 300,
        }}
      />
      <TextInput
        placeholder="Digite a cidade..."
        value={cidade}
        onChangeText={(text) => setCidade(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 20,
          width: 300,
        }}
      />
      <TextInput
        placeholder="Digite o responsável..."
        value={responsavel}
        onChangeText={(text) => setResponsavel(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 20,
          width: 300,
        }}
      />
      <TextInput
        placeholder="Digite o supervisor..."
        value={supervisor}
        onChangeText={(text) => setSupervisor(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 20,
          width: 300,
        }}
      />
      <Button title="Compartilhar Documento" onPress={handleFillDocument} />
    </View>
  );
}
