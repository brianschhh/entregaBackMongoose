import Mongoose from "mongoose";

const Schema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
});

export const ProductosModel = Mongoose.model("productos", Schema);
