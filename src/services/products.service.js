import { ProductosModel } from "../models/products.model.js";

export async function createProduct(data) {
  try {
    await ProductosModel.create(data);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProducts() {
  try {
    const products = await ProductosModel.find();
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteProduct(productsid) {
  try {
    await ProductosModel.findByIdAndDelete(productsid);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateProduct(productsid, data) {
  try {
    await ProductosModel.findByIdAndDelete(productsid, {
      title,
      price,
      stock,
    });
    const updated = await ProductosModel.findById(productsid);
    return;
  } catch (error) {
    throw new Error(error);
  }
}
