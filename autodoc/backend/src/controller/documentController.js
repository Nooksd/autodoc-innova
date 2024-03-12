import Document from "../model/documentModel.js";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import axios from "axios";
import { DOMParser } from "xmldom";

async function detectVariables(link) {
  try {
    const response = await axios.get(link, {
      responseType: "arraybuffer",
    });

    const zip = new PizZip(response.data);
    const doc = new Docxtemplater(zip);

    const xmlContent = doc.getZip().file("word/document.xml").asText();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    const textContent = xmlDoc.documentElement.textContent;

    let variablesSet = new Set();
    let multipleVariablesSet = new Set();

    const singleVariableRegex = /\{([^{}\d]+?)\}/g;
    const multipleVariableRegex = /\{([^{}]*\d[^{}]*)\}/g;
    let match;

    while ((match = singleVariableRegex.exec(textContent)) !== null) {
      const variable = match[1];
      variablesSet.add(variable);
    }

    while ((match = multipleVariableRegex.exec(textContent)) !== null) {
      const variable = match[1];
      multipleVariablesSet.add(variable);
    }

    const variables = [...variablesSet];
    const multipleVariables = [...multipleVariablesSet];

    return { variables, multipleVariables };
  } catch (error) {
    console.error("Erro ao detectar as variáveis:", error);
    throw error;
  }
}

export async function create(req, res) {
  const { title, name, link } = req.body;
  const creator = req.user.user._id

  if ((!title, !name, !link, !creator)) {
    return res.status(404).json({
      status: false,
      message: "credenciais necessárias",
    });
  }
  try {
    const { variables, multipleVariables } = await detectVariables(link);

    Document.create({
      title,
      name,
      link,
      creator,
      variables,
      multipleVariables,
    });

    res.status(201).json({
      status: true,
      message: "template criado com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

export async function getAll(req, res) {
  const maneger = req.user.user.maneger
  let creator
  if (maneger === null) {
    creator = req.user.user._id
  } else {
    creator = req.user.user.maneger
  }
  try {
    const documents = await Document.find({
      creator,
    })
    res.status(201).json({
      status: true,
      documents,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}
