import { Router } from 'express'
import connectDB from '../utils/connectDB.js'
import bcrypt from 'bcrypt'
import { AdminModel } from '../db/adminSchema.js'
import duplicateValueError from '../utils/duplicateValueError.js'
import { dataAdded, defaultError } from '../utils/commonResponse.js'
import { serverError } from '../utils/errorHandler.js'
const addAdmin = Router()

addAdmin.get('/', (req, res) => {
  res.status(200).json({
    message: 'Admin is working good.',
    url: req.url,
  })
})

addAdmin.post('/admin-login', async (req, res) => {
  try {
    if (!req.body) {
      throw new Error('No Body Provided: [Body Empty]')
    }
    const { email, password } = req.body
    connectDB()
    const admin = await AdminModel.findOne({ email: email })
    const isMatch = await bcrypt.compare(password, admin.password)
    res.status(200).json({ isMatch })
  } catch (error) {
    serverError(res, error)
  }
})

addAdmin.post('/add-admin', async (req, res) => {
  try {
    if (!req.body) {
      return errorEmptyBody()
    }
    const { name, email, password } = req.body
    const hashPass = await bcrypt.hash(password, 10)
    connectDB()
    const admin = await AdminModel.create({
      name,
      email,
      password: hashPass,
    })
    return dataAdded(res, admin)
  } catch (error) {
    if (error.code == 11000) {
      return duplicateValueError(res, error)
    }
    defaultError(res, error)
  }
})

export default addAdmin
