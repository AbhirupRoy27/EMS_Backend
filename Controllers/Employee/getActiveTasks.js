import { Task } from '../../db/taskSchema.js'
import connectDB from '../../utils/connectDB.js'
import { errorEmptyBody } from '../../utils/errorHandler.js'

const getActiveTask = async (req, res) => {
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
      await connectDB()

      const data = await Task.findOneAndUpdate(
        { _id: req.body._id, task_status: { $ne: req.body.task_status } },
        { $set: { task_status: 'pending' } },
        { new: true, projection: { task_status: 1, _id: 0 } }
      )

      if (!data) {
        return res
          .status(404)
          .json({
            status: false,
            code: 'NOT_FOUND',
            message: 'Task not found or already Updated',
          })
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

    return console.error(404, error)
  }
}

export default getActiveTask
