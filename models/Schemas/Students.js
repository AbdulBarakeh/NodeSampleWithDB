const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Name: "string",
  FieldOfStudy: "string",
});
const Students = mongoose.model("Students", schema);

module.exports = {
  schema,
  Students,
};
