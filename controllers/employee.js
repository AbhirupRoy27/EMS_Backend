import { Router } from 'express'
import connectDB from '../utils/connectDB.js'
import { employeeDataFormatter } from '../utils/empFormatter.js'
import { Employee } from '../db/empSchema.js'
import duplicateValueError from '../utils/duplicateValueError.js'
import { dataAdded, defaultError } from '../utils/commonResponse.js'
import dateFormatter from '../utils/dateFormatter.js'
import { Task } from '../db/taskSchema.js'
const employee = Router()

employee.post('/add-emp', async (req, res) => {
  try {
    if (!req.body) {
      throw new Error('No Body Provided: [Body Empty]')
    }

    await connectDB()
    const data = await employeeDataFormatter(req)
    const updated = await Employee.create(data)
    console.log(updated)
    return dataAdded(res, updated)
  } catch (error) {
    if (error.code === 11000) {
      return duplicateValueError(res, error)
    }
    defaultError(res, error)
  }
})

employee.post('/add-task', async (req, res) => {
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
})

employee.get('/get-tasks', async (req, res) => {
  try {
    connectDB()
    const user = await Employee.findOne({ email: req.body.email })

    res.status(200).json({
      status: true,
      message: 'List of all tasks.',
      data: user.tasks,
    })
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: 'Not Found', error: error.message })
  }
})

employee.get('/', async (req, res) => {
  await connectDB()

  // const count = await Employee.countDocuments({ deadline: { $type: 'string' } })
  res.status(200).json({
    status: true,
    message: 'Employee Working fine!',
    url: req.originalUrl,
    // DB: count,
  })
})

export default employee
