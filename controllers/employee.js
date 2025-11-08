import { Router } from 'express'
import { employeeDataFormatter } from '../utils/empFormatter.js'
import connectDB from '../utils/connectDB.js'
import { Employee } from '../db/empSchema.js'
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
      throw new Error('Error working')
    }
    const data = await employeeDataFormatter(req)
    connectDB()
    const updated = await Employee.create(data)
    res.status(200).json({
      status: true,
      message: 'Employee Added!',
      data: updated,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: false,
        message: 'duplicate key: { email: "abhirup605roy@gmail.com" }',
      })
    }
    res.status(404).json({
      status: false,
      message: 'Employee Not Found!',
      error: error.message,
    })
  }
})

export default employee
