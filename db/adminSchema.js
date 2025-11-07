import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    authorization: {
      type: String,
      trim: true,
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
)

export const AdminModel = mongoose.model('admin', adminSchema)
