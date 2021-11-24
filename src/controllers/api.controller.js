import { listaRandoms } from "../utils/calculo.js";
import { logInfo, logError } from "../utils/logger.js";

// import { logInfo, logError } from '../utils/logger.util.js';

const dev = process.env.NODE_ENV == "development";

export const randomNumbers = (req, res) => {
  try {
    const cantidad = +req.query.cantidad || 1e8;

    const info = `Cantidad: ${cantidad}`;

    dev ? console.log(info) : logInfo(info);

    const resultado = listaRandoms(cantidad);

    // Testear el rendimiento con y sin este console.log:

    dev && console.log(resultado);

    res.send({ resultado });
  } catch (error) {
    dev ? console.log(error) : logError(error);
  }
};
