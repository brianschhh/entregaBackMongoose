import "./db.js";
import express from "express";
import emoji from "node-emoji";
import router from "./routers/router.js";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";
import handlebars from "express-handlebars";
import passport from "passport";
import { Strategy } from "passport-facebook";
import path from "path";
import minimist from "minimist";
import { fork } from "child_process";

const options = {
  default: {
    puerto: 8080,
  },
};
const computo = fork("./src/randoms/calculo.js");

const arg = minimist(process.argv.slice(2), options);

console.log(arg);

dotenv.config();

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"],
      scope: ["email"],
    },
    (accessToken, refreshToken, userProfile, done) => {
      console.log(userProfile);
      return done(null, userProfile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 300000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.engine(".hbs", handlebars({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");
app.use(express.static("public"));

app.get("/api/sum", (req, res) => {
  computo.on("message", (resultado) => {
    res.status(200).json({ resultado });
    console.log("resultado+++++", resultado);
  });
  computo.send("start");
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve() + "/public/login.html");
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/failLogin",
  })
);

app.get("/info", (req, res) => {
  res.send(`directorio actual del trabajo:${process.cwd()},
    id del proceso:${process.pid},
    version de node :${process.version},
    título del proceso: ${process.title},
    sistema operativo :${process.platform},
    uso de la memoria: ${process.memoryUsage()}`);
});

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/products");
  } else {
    res.redirect("/login");
  }
});

app.get("/failLogin", (req, res) => {
  console.log("Login error");
  res.render("login-error", {});
});

// app.get("/products", (req, res) => {
//   if (req.isAuthenticated()) {
//     if (!req.user.contador) req.user.contador = 0;
//     req.user.contador++;
//     res.render("products", {
//       nombre: req.user.displayName,
//       foto: req.user.photos[0].value,
//       contador: req.user.contador,
//     });
//   }
// });

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use("/", router);

app.listen(8080, () => console.log(emoji.get("fire"), "Server connect "));
