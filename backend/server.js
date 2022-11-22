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

// put protected routes underneath this
app.use(verifyJWT);
app.use("/api/register", require("./routes/register"));
app.use("/api/users", require("./routes/users"));
app.use("/api/shops", require("./routes/shops"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));

// Serve frontend for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Connected to MongoDB. Server listening on port ${PORT}`);
  });
});
