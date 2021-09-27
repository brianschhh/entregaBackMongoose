import "./db.js";
import express from "express";
import emoji from "node-emoji";
import router from "./routers/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});

app.use("/api", router);

app.listen(3001, () => console.log(emoji.get("fire"), "Server on port 3001"));
