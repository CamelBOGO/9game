import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },
})



export default mongoose.models.User || mongoose.model("User", userSchema)
