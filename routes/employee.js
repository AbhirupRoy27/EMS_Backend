import { Router } from 'express'
import connectDB from '../utils/connectDB.js'
import { employeeDataFormatter } from '../utils/empFormatter.js'
import { Employee } from '../db/empSchema.js'
import duplicateValueError from '../utils/duplicateValueError.js'
import { dataAdded, defaultError } from '../utils/commonResponse.js'
import addTask from '../Controllers/Employee/addTask.js'
import defaultResponse from '../Controllers/Employee/default.js'
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

employee.post('/add-task', addTask)

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

employee.get('/', defaultResponse)

export default employee
