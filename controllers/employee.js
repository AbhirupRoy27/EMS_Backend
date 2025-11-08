import { Router } from 'express'
import connectDB from '../utils/connectDB.js'
import { employeeDataFormatter } from '../utils/empFormatter.js'
import { Employee } from '../db/empSchema.js'
import duplicateValueError from '../utils/duplicateValueError.js'
import { dataAdded, defaultError } from '../utils/commonResponse.js'
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

export default employee
