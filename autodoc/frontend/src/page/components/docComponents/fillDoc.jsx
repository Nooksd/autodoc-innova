import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import * as Sharing from "expo-sharing";
import {
  readAsStringAsync,
  downloadAsync,
  EncodingType,
  documentDirectory,
  writeAsStringAsync,
} from "expo-file-system";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

export function DocumentFiller() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [cidade, setCidade] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [supervisor, setSupervisor] = useState("");

  const handleShareDocument = async () => {
    try {
      const isDownloaded = async () => {
        try {
          await readAsStringAsync(documentDirectory + "relatorio-tecnico.docx");

          return true;
        } catch (e) {
          return false;
        }
      };

      if (await isDownloaded()) {
      } else {
        const downloadRes = await downloadAsync(
          "https://www.dropbox.com/scl/fi/glf76pas92v6vckyeu0ct/final.docx?rlkey=kg6r7xwibs98otre5c2exjy98&dl=1",
          documentDirectory + "relatorio-tecnico.docx"
        );

        if (downloadRes.status !== 200) {
          throw new Error("Falha ao baixar o documento");
        }
      }

      const templateUri = documentDirectory + "relatorio-tecnico.docx";

      const content = await readAsStringAsync(templateUri, {
        encoding: EncodingType.Base64,
      });

      const zip = new PizZip(content, { base64: true });

      const doc = new Docxtemplater(zip);

      doc.render({
        nome: nome,
        data: data,
        local: local,
        cidade: cidade,
        responsavel: responsavel,
        supervisor: supervisor,
      });

      const out = doc.getZip().generate({
        type: "base64",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const newFilePath = documentDirectory + "relatorio-tecnico.docx";
      await writeAsStringAsync(newFilePath, out, {
        encoding: EncodingType.Base64,
      });

      await Sharing.shareAsync(newFilePath, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
    } catch (error) {
      console.error(error);
    }
  };

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
      <Button title="Compartilhar Documento" onPress={handleShareDocument} />
    </View>
  );
}
