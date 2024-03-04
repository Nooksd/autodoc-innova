import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../middlewares/validateToken.js";
import cloudinary from "../../helper/imageUpload.js";

export async function verify(req, res) {
  let maneger;
  const { email, password } = req.body;

  const user = await User.findByEmail(email);

  if (!user || !(await User.comparePassword(password, user.password))) {
    return res
      .status(401)
      .json({ status: false, message: "Email e/ou senha inválidos" });
  }

  if (user.maneger === null) {
    maneger = true;
  } else {
    maneger = user.maneger;
  }

  const token = createToken(user);

  res.json({
    status: true,
    message: "Login realizado com sucesso",
    token,
    maneger,
  });
}

export async function createUser(req, res) {
  try {
    const { fullName, email, password, maneger } = req.body;

    const isThisEmailUnique = await User.isThisEmailUnique(email);

    if (!isThisEmailUnique)
      return res.json({
        status: false,
        message: "E-mail já cadastrado",
      });

    const hashedPassword = await bcrypt.hash(password, 8);

    if (maneger) {
      const doesManegerExists = await User.doesManegerExists(maneger);

      if (!isThisEmailUnique)
        return res.json({
          status: false,
          message: "Gerente não existe",
        });

      User.create({
        fullName,
        email,
        password: hashedPassword,
        maneger,
      });
    } else {
      User.create({
        fullName,
        email,
        password: hashedPassword,
      });
    }

    res.status(201).json({
      status: true,
      message: "USUÁRIO CRIADO COM SUCESSO",
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: e.message,
    });
  }
}

export const getUserProfile = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autenticado",
    });
  }

  return res.status(200).json({
    status: true,
    user: user,
  });
};

export async function deleteUser(req, res) {
  res.json("ACHA UM USUÁRIO E O APAGA PELO ID: " + req.params.id);
}

export async function updateUser(req, res) {
  res.json("ACHA UM USUÁRIO E O ATUALIZA PELO ID: " + req.params.id);
}

export async function uploadAvatar(req, res) {
  const { user } = req;
  if (!user)
    return res.status(401).json({
      status: false,
      message: "Usuário não autenticado",
    });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user.id}_avatar`,
      folder: "avatar",
      width: 500,
      height: 500,
    });

    await User.findByIdAndUpdate(user.id, { avatar: result.url });

    res.status(201).json({
      status: true,
      message: "Avatar atualizado com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}
