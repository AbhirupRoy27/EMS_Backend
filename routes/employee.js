import { Router } from 'express'
import defaultResponse from '../Controllers/Employee/default.js'
import addEmployee from '../Controllers/Employee/addEmployee.js'
import updateTaskStatus from '../Controllers/Employee/updateTaskStatus.js'
import getPendingTask from '../Controllers/Employee/getPendingTask.js'
import getActiveTasks from '../Controllers/Employee/getActiveTask.js'
const employee = Router()

employee.post('/add-emp', addEmployee)

employee.post('/get-tasks', getPendingTask)

employee.post('/active-task', getActiveTasks)

employee.patch('/update-task', updateTaskStatus)

employee.get('/', defaultResponse)

export default employee
