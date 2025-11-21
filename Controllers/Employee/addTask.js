import dateFormatter from '../../utils/dateFormatter.js'
import { Task } from '../../db/taskSchema.js'
import connectDB from '../../utils/connectDB.js'
import { Employee } from '../../db/empSchema.js'

const addTask = async (req, res) => {
  try {
    if (!req.body) {
      throw Error('Empty Body')
    }
    await connectDB()
    // await Employee.collection.dropIndexes()
    // await Employee.syncIndexes()

    const email = req.body.task_given_by.trim()
    const user = await Employee.aggregate([
      { $match: { email } },
      { $project: { name: 1, email: 1, tasks: 1, _id: 0 } },
      {
        $addFields: {
          isActive: true,
        },
      },
    ])
    if (!user) {
      throw Error(
        `No Employee with email: { ${req.body.task_given_by.trim()} }`
      )
    }
    const task = dateFormatter(req.body)

    const taskAdded = await Task.create(task)

    const updatedTask = await Employee.updateOne(
      { email: email },
      { $push: { tasks: taskAdded._id } }
    )
    if (updatedTask.matchedCount > 0) {
      return res.status(200).json({
        status: true,
        message: 'Working',
        task,
      })
    }
    // // res.status(304).end()  // use this because, res.status(304).json({..}) construct is a logical inconsistency in HTTP communication and should be avoided.
    res.status(200).json({
      status: true,
      message: 'No data changed',
      updatedTask,
    })
  } catch (error) {
    if (error.message == 'Empty Body') {
      return res.status(401).json({ status: false, message: error.message })
    }
    res
      .status(404)
      .json({ status: false, message: 'Not Found', error: error.message })
  }
}

export default addTask
