const mongoose = require("mongoose");

const dutySchema = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Duty", dutySchema);
