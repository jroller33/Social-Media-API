
const { connect, connection } = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/socialDB";

connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = connection;