import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email Address"],
    },

    password: {
        type: String,
        required: true
    },

    reset_token: {
        type: String,
    },

    isVerified: {
        type: Boolean,
    },

    verification_token: {
        type: String,
    },

    accessToken: {
        type: String,
    }

=======
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email Address"],
  },

  password: {
    type: String,
    required: true
  },

  reset_token: {
    type: String,
  },

  isVerified: {
    type: Boolean,
  },

  verification_token: {
    type: String,
  },
  
  accessToken:{
    type: String,
  }
>>>>>>> parent of 01769e88 (Added Comment Basic Structure)
})


export default mongoose.models.User || mongoose.model("User", userSchema)
