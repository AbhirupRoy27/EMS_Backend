import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: Number,
      required: true,
      unique: true,
    },
    task_title: {
      type: String,
      required: true,
      trim: true,
    },
    task_status: {
      type: String,
      enum: ['active', 'pending', 'completed', 'failed'],
      default: 'pending',
    },
    task_given_by: {
      type: String,
      required: true,
    },
    task_description: {
      type: String,
      trim: true,
    },
    task_category: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

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
  },
  position: String,
  department: String,

  tasks: [TaskSchema],

  joinedAt: {
    type: Date,
    default: Date.now,
  },
})

export const Employee = mongoose.model('Employee', EmployeeSchema)
