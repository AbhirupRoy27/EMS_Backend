import { Router } from 'express'
import addTask from '../Controllers/Admin/addTask.js'
import defaultResponse from '../utils/defaultResponse.js'
import adminLogin from '../Controllers/Admin/adminLogin.js'
import addAdmin from '../Controllers/Admin/addAdmin.js'

const adminRouter = Router()

adminRouter.post('/add-task', addTask)

adminRouter.post('/admin-login', adminLogin)

adminRouter.post('/add-admin', addAdmin)

adminRouter.get('/', defaultResponse)

export default adminRouter
