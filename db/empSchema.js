import mongoose, { Mongoose } from 'mongoose'

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

  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'task',
  },

  joinedAt: {
    type: Date,
    default: Date.now,
  },
})

export const Employee = mongoose.model('Employee', EmployeeSchema)
