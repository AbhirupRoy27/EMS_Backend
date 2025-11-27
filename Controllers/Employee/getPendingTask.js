import { Employee } from '../../db/empSchema.js'
import { Task } from '../../db/taskSchema.js'
import connectDB from '../../utils/connectDB.js'

const getPendingTask = async (req, res) => {
  try {
    if (!req.body.task_for) {
      throw new Error('Email Missing in body.')
    }

    await connectDB()
    const user = await Employee.findOne(
      { email: req.body.task_for },
      { _id: 0, tasks: 1 }
    )
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'No Such Employee found.',
        email: req.body.task_for,
      })
    }

    const tasks = await Task.find(
      {
        _id: { $in: user.tasks },
        // task_status: { $eq: 'pending' },
      },
      { task_title: 1, task_status: 1, task_given_by: 1, deadline: 1 }
    )

    res.status(200).json({
      status: true,
      tasks,
    })
  } catch (error) {
    return res
      .status(404)
      .json({ status: false, message: 'Not Found', error: error.message })
  }
}

export default getPendingTask
