const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  id: { type: String },
});

const users = mongoose.model("Users", usersSchema);

module.exports = users;
