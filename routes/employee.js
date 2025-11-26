import { Router } from 'express'
import defaultResponse from '../Controllers/Employee/default.js'
import getTask from '../Controllers/Employee/getTask.js'
import addEmployee from '../Controllers/Employee/addEmployee.js'
import getActiveTask from '../Controllers/Employee/updateTaskStatus.js'
const employee = Router()

employee.post('/add-emp', addEmployee)

employee.post('/get-tasks', getTask)

employee.patch('/update-task', getActiveTask)

employee.get('/', defaultResponse)

export default employee
