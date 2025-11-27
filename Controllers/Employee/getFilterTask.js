import { Task } from '../../db/taskSchema.js'
import connectDB from '../../utils/connectDB.js'

export default async function getFilterTasks(req, res) {
  const email = req.body.task_for
  const status = req.body.task_status
  const allowed = ['pending', 'accepted', 'completed', 'failed']
  if (!allowed.includes(status)) {
    return res.status(400).json({
      messgae: 'BAD_REQUEST',
      status: false,
    })
  }

  await connectDB()
  const data = await Task.find(
    {
      task_for: email,
      task_status: status,
    },
    {
      task_for: 1,
      task_title: 1,
      task_status: 1,
      task_given_by: 1,
      task_description: 1,
      deadline: 1,
    }
  )
  if (data.length < 1) {
    return res.status(404).json({
      messgae: 'NOT_FOUND',
      status: false,
    })
  }
  return res.status(200).json({
    messgae: 'Working Bro...',
    data,
    totalItems: data.length,
  })
}
