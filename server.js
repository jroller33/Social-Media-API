const express = require("express");
const mongoose = require("mongoose");
const routes = require("./api_routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use(routes);

// connect to mongo db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-media_db");

// start the server
app.listen(PORT, () =>
  console.log(`Server now listening on http://localhost:${PORT}/`)
);