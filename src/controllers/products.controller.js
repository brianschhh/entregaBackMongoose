import * as productService from "../services/products.service.js";
import path from "path";

export async function createProduct(req, res) {
  const { body } = req;
  try {
    await productService.createProduct(body);
    res.status(200).send("Usuario creado!");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getProducts(req, res) {
  // try {
  const product = await productService.getProducts();

  //   res.status(200).json({ product });
  //   console.log(product);
  // console.log("product", product);
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }

  if (req.isAuthenticated()) {
    if (!req.user.contador) req.user.contador = 0;
    req.user.contador++;
    res.render("products", {
      nombre: req.user.displayName,
      foto: req.user.photos[0].value,
      contador: req.user.contador,
      producto: product,
    });
  }
}

export async function deleteProduct(req, res) {
  const { userId } = req.params;
  try {
    await productService.deleteProduct(productsid);
    res.status(200).send("Usuario borrado!");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function updateProduct(req, res) {
  const { productsid } = req.params;
  const { body } = req;
  try {
    await productService.updateProduct(productsid, body);
    res.status(200).send("Usuario actulizado!");
  } catch (error) {
    res.status(400).send(error.message);
  }
}
