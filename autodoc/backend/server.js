// server.js

// imports do servidor
import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routes/userApi.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Importar o arquivo de conexão com o banco de dados
import "./database/db.js";

// configuração do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use(cors());

// Middleware para lidar com erros de timeout do MongoDB
app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error && err.name === "MongooseError") {
    return res
      .status(500)
      .json({ status: false, message: "Erro interno do servidor" });
  }
  next(err);
});

// porta que rodara o host local
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 http://localhost:3000");
});