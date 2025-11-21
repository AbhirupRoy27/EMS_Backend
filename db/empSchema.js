import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  position: String,
  department: String,

  tasks: { type: Array },

  joinedAt: {
    type: Date,
    default: Date.now,
  },
})

export const Employee = mongoose.model('Employee', EmployeeSchema)
