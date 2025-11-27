import { Task } from '../../db/taskSchema.js'
import connectDB from '../connectDB.js'

const getTaskCount = async (req, res) => {
  try {
    const email = req.body?.task_for
    if (!email) {
      return res.status(400).json({
        status: false,
        message: 'BAD_REQUEST',
      })
    }

    await connectDB()
    const data = await Task.aggregate([
      {
        $match: { task_for: email },
      },
      { $group: { _id: '$task_status', count: { $sum: 1 } } },
      {
        $project: {
          _id: 0,
          status: '$_id', // rename _id to "status"
          count: 1,
        },
      },
    ])

    if (data.length < 1) {
      return res.status(404).json({
        status: true,
        message: `NOT_FOUND: No Employee with this email: ${email}`,
      })
    }

    return res.status(200).json({
      status: true,
      message: 'Working',
      data,
    })
  } catch (error) {
    return res.status(200).json({
      status: true,
      message: 'Working',
      error: error.message,
    })
  }
}

export default getTaskCount
