import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
    required: true,
  },
  variables: [String],
  multipleVariables: [String],
});

export default mongoose.model("Document", documentSchema);
