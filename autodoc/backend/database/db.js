import mongoose from "mongoose"

mongoose
.connect('mongodb+srv://suporte:fHHT0max1jlSYlvU@autodoc.8fbgaow.mongodb.net/?retryWrites=true&w=majority&appName=autodoc')
  .catch((err) => {
    console.log(err);
  });
