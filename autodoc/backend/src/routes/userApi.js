import express from "express";
import * as userController from "../controller/userController.js";
import {
  userValidatorCheck,
  userValidator,
  userLoginCheck,
} from "../middlewares/validateCredentials.js";
import { validateToken } from "../middlewares/validateToken.js";
import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Arquivo de imagem inválido", false);
  }
};

const uploads = multer({ storage, fileFilter });

const Router = express.Router();

Router.post("/verify", userLoginCheck, userValidator, userController.verify);
Router.post(
  "/create",
  validateToken,
  userValidatorCheck,
  userValidator,
  userController.createUser
);
Router.post(
  "/upload-avatar",
  validateToken,
  uploads.single("profile"),
  userController.uploadAvatar
);
Router.get("/get-profile", validateToken, userController.getUserProfile);
Router.delete("/delete/:id", userController.deleteUser);
Router.put("/update/:id", userController.updateUser);

export default Router;
