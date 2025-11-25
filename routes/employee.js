import { Router } from 'express'
import defaultResponse from '../Controllers/Employee/default.js'
import getTask from '../Controllers/Employee/getTask.js'
import addEmployee from '../Controllers/Employee/addEmployee.js'
import { errorEmptyBody } from '../utils/errorHandler.js'
const employee = Router()

employee.post('/add-emp', addEmployee)

employee.post('/get-tasks', getTask)

employee.patch('/actve-tasks', async (req, res) => {
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
      return res.status(200).json({
        status: true,
        body: req.body,
        message: 'hello Ji',
      })
    }
    throw new Error('Missing Fileds')
  } catch (error) {
    if (error.message === 'Missing Fileds')
      return res.status(404).json({ status: false, message: 'Missing data' })

    return console.error(404)
  }
})

employee.get('/', defaultResponse)

export default employee
