import dateFormatter from '../../utils/dateFormatter.js'
import { Task } from '../../db/taskSchema.js'
import connectDB from '../../utils/connectDB.js'
import { Employee } from '../../db/empSchema.js'
import { AdminModel } from '../../db/adminSchema.js'

const addTask = async (req, res) => {
  try {
    const task = dateFormatter(req.body)
    if (task === 'empty-Body') {
      return res.status(409).json({
        status: false,
        message: 'empty body',
      })
    } else if (!task) {
      return res.status(409).json({
        status: task,
        message: 'the deadline is in the past!',
      })
    }

    await connectDB()

    const isAdminPresent = await AdminModel.aggregate([
      { $match: { email: req.body.task_given_by.trim() } },
      { $project: { email: 1, _id: 0 } },
    ])
    if (isAdminPresent.length < 1) {
      throw Error(`No Admin with email: { ${req.body.task_given_by.trim()} }`)
    }

    const isEmployeePresent = await Employee.aggregate([
      { $match: { email: req.body.task_for.trim() } },
      { $project: { email: 1, tasks: 1, _id: 0 } },
    ])
    if (isEmployeePresent.length < 1) {
      throw Error(`No Employee with email: { ${req.body.task_for.trim()} }`)
    }

    // if (isEmployeePresent[0].tasks.length >= 10) {
    //   return res.status(200).json({
    //     success: false,
    //     // isEmployeePresent,
    //     message: 'limit of task on this employee reaced',
    //   })
    // }

    const taskAdded = await Task.create(task)
    // const updatedTask = await Employee.updateOne(
    //   { email: req.body.task_for.trim() },
    //   { $push: { tasks: taskAdded._id } }
    // )
    if (taskAdded) {
      return res.status(200).json({
        status: true,
        message: 'Working',
        taskAdded,
      })
    }
    // res.status(304).end()  // use this because, res.status(304).json({..}) construct is a logical inconsistency in HTTP communication and should be avoided.
    res.status(200).json({
      status: true,
      message: 'No data changed',
      updatedTask,
    })
  } catch (error) {
    if (error.message == 'Empty Body') {
      return res.status(401).json({ status: false, message: error.message })
    }
    if (error.code == 11000) {
      return res.status(200).json({
        status: false,
        message: 'Two task with same deadline not allowed.',
      })
    }
    res
      .status(404)
      .json({ status: false, message: 'Not Found', error: error.message })
  }
}

export default addTask
