import mongoose from 'mongoose'
import { Task } from '../../db/taskSchema.js'
import connectDB from '../../utils/connectDB.js'
import { errorEmptyBody } from '../../utils/errorHandler.js'
import { Employee } from '../../db/empSchema.js'

const updateTaskStatus = async (req, res) => {
  try {
    if (
      !req.body ||
      (typeof req.body === 'object' && Object.keys(req.body).length === 0)
    ) {
      const err = new Error('Request body is empty')
      err.code = 'EMPTY_BODY'
      err.statusCode = 422
      return errorEmptyBody(res, err)
    }

    if (req.body._id && req.body.task_status) {
      const taskId = new mongoose.Types.ObjectId(req.body._id)
      await connectDB()

      const data = await Task.findOneAndUpdate(
        { _id: taskId, task_status: { $ne: req.body.task_status } },
        {
          $set: {
            task_status: req.body.task_status,
          },
        },
        {
          new: true,
          projection: {
            deadline: 1,
            task_given_by: 1,
            task_status: 1,
            task_title: 1,
            _id: 0,
          },
        }
      )

      if (!data) {
        return res.status(404).json({
          status: false,
          code: 'NOT_FOUND',
          message: 'Task not found or already Updated',
        })
      }

      if (data.task_status === 'completed') {
        const updatedData = await Employee.updateOne(
          {
            tasks: taskId,
          },
          { $pull: { tasks: taskId } },
          { new: true, projection: { _id: 0, tasks: 1 } }
        )
        if (updatedData.modifiedCount === 1) {
          return res.status(200).json({
            status: true,
            updatedData,
            message: 'UPDATED!!',
          })
        }
        throw new Error('Internal Server Error')
      }

      return res.status(200).json({
        status: true,
        data,
        message: 'UPDATED!!',
      })
    }
    throw new Error('Missing Fileds')
  } catch (error) {
    if (error.message === 'Missing Fileds')
      return res.status(404).json({ status: false, message: 'Missing data' })

    return res.status(500).json({ status: false, message: error.message })
  }
}

export default updateTaskStatus
