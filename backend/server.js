require("dotenv").config();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const express = require("express");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

// Connect to MongoDB
connectDB();

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/refresh", require("./routes/refresh"));
app.use("/api/logout", require("./routes/logout"));

app.use("/api/register", verifyJWT, require("./routes/register"));
app.use("/api/users", verifyJWT, require("./routes/users"));
app.use("/api/shops", verifyJWT, require("./routes/shops"));
app.use("/api/categories", verifyJWT, require("./routes/categories"));
app.use("/api/products", verifyJWT, require("./routes/products"));

// Serve frontend for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html"),
      (err) => {
        if (err) {
          res.send(`
          <h1>Something went wrong</h1>
          <h3>Make sure the frontend build folder exists.</h3>
          <p>${err}</p>`);
        }
      }
    )
  );
}

const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Connected to MongoDB. Server listening on port ${PORT}`);
  });
});
