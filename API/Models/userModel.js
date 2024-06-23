const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
  name: String,
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass:{
    required: true,
    type: String,

  },
  
});

// const USER_MODEL = model("user", userSchema);

// module.exports = USER_MODEL;

const USER_MODEL = models.user || model("user", userSchema);

module.exports = USER_MODEL;
