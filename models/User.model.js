const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: { type: String, default: 'No existe descripción.' },
    // add roles setup here
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MOD"],
      default: 'USER'
    }
  },
  {
    timestamps: true
  })

const User = model("User", userSchema)

module.exports = User