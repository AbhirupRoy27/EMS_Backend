import { Task } from '../../db/taskSchema.js'
import connectDB from '../../utils/connectDB.js'

const getTaskById = async (req, res) => {
  try {
    const id = req.body._id
    if (!id) {
      return res.status(400).json({
        status: false,
        message: 'BAD_REQUEST',
      })
    }
    await connectDB()
    const data = await Task.findOne(
      { _id: id },
      {
        task_title: 1,
        deadline: 1,
        task_given_by: 1,
        task_status: 1,
        task_description: 1,
      }
    )
    return res.status(200).json({
      status: true,
      data,
    })
  } catch (error) {
    res.status(404).json({
      status: false,
      message: 'NOT_FOUND',
    })
  }
}

export default getTaskById
