import { Router } from 'express'
import defaultResponse from '../Controllers/Employee/default.js'
import addEmployee from '../Controllers/Employee/addEmployee.js'
import updateTaskStatus from '../Controllers/Employee/updateTaskStatus.js'
import getPendingTask from '../Controllers/Employee/getPendingTask.js'
import getFilterTasks from '../Controllers/Employee/getFilterTask.js'
import getTaskById from '../Controllers/Employee/getTaskById.js'
import getTaskCount from '../utils/Task/getTaskCont.js'
const employee = Router()

employee.post('/add-emp', addEmployee)

employee.post('/get-tasks', getPendingTask)

employee.post('/task-count', getTaskCount)

employee.post('/get-task-byId', getTaskById)

employee.post('/filter-task', getFilterTasks)

employee.patch('/update-task', updateTaskStatus)

employee.get('/', defaultResponse)

export default employee
