import { Router } from 'express'
import connectDB from '../utils/connectDB.js'
import { employeeDataFormatter } from '../utils/empFormatter.js'
import { Employee } from '../db/empSchema.js'
import duplicateValueError from '../utils/duplicateValueError.js'
import { dataAdded, defaultError } from '../utils/commonResponse.js'
import dateFormatter from '../utils/dateFormatter.js'
const employee = Router()

employee.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Employee Working fine!',
    url: req.originalUrl,
  })
})

employee.post('/add-emp', async (req, res) => {
  try {
    if (!req.body) {
      throw new Error('No Body Provided: [Body Empty]')
    }
    connectDB()
    const data = await employeeDataFormatter(req)
    const updated = await Employee.create(data)
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
    connectDB()
    const user = await Employee.findOne({ email: req.body.email })
    const date = dateFormatter(req.body.task)
    const task = req.body.task
    task.deadline = date
    if (!user) {
      return res.status(404).json({ status: false, message: 'No User Found' })
    }
    const updatedTask = await Employee.updateOne(
      { email: req.body.email },
      { $push: { tasks: task } }
    )
    res.status(200).json({
      status: true,
      message: 'Working',
      data: user,
      task,
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
      message: 'Working',
      data: user.tasks,
    })
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: 'Not Found', error: error.message })
  }
})

export default employee
