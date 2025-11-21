import { Router } from 'express'
import defaultResponse from '../Controllers/Employee/default.js'
import getTask from '../Controllers/Employee/getTask.js'
import addEmployee from '../Controllers/Employee/addEmployee.js'
const employee = Router()

employee.post('/add-emp', addEmployee)

employee.get('/get-tasks', getTask)

employee.get('/', defaultResponse)

export default employee
