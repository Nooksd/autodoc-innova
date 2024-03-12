import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  maneger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  avatar: String,
});

userSchema.index({ email: 1 });

userSchema.statics.isThisEmailUnique = async function (email) {
  try {
    if (!email) throw new Error("Email inválido");
    const user = await this.findOne({ email });

    if (user) return false;
    return true;
  } catch (err) {
    console.log("Erro ao verificar email ", err.message);
    return false;
  }
};

userSchema.statics.doesManegerExists = async function(maneger) {
  try {
    if (!maneger) throw new Error("Maneger inválido");
    const user = await this.findOne({ maneger }).exec();
    if (user) return true;
    return false;
} catch(e) {
  console.log("Erro ao verificar maneger ", e.message);
  return false;
}
}

userSchema.statics.findByEmail = async function(email) {
  try {
      return await this.findOne({ email }).exec();
  } catch (error) {
      throw new Error(`Erro ao buscar usuário pelo e-mail: ${error.message}`);
  }
};

userSchema.statics.comparePassword = async function (password, hash) {
  try {
    if (!password) throw new Error("Senha inválida");
    const result = await bcrypt.compare(password, hash);

    return result;
  } catch (err) {
    console.log("Erro ao verificar senha ", err.message);
    return false;
  }
};

export default mongoose.model("User", userSchema);
