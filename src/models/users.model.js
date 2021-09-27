import Mongoose from "mongoose";

const Schema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  dni: {
    type: Number,
    require: true,
  },
});

export const UsersModel = Mongoose.model("usuarios", Schema);
