import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email Address"],
  },

  password: {
    type: String,
    required: true
  }
})


export default mongoose.models.User || mongoose.model("User", userSchema)
