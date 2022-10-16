const express = require("express");
const mongoose = require("mongoose");
const routes = require("./controllers/routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-media_db");

app.listen(PORT, () =>
  console.log(`Server now listening on http://localhost:${PORT}/`)
);