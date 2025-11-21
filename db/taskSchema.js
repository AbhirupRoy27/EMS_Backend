import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
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
      trim: true,
    },
    task_description: {
      type: String,
      trim: true,
      required: true,
    },
    task_category: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Task = mongoose.model('task', TaskSchema)
