import { Router } from 'express'
import connectDB from '../utils/connectDB.js'
import bcrypt from 'bcrypt'
import { AdminModel } from '../db/adminSchema.js'
const addAdmin = Router()

addAdmin.get('/', (req, res) => {
  connectDB()
  res.status(200).json({
    message: 'Admin is working good.',
    url: req.url,
  })
})

addAdmin.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body
    connectDB()
    const admin = await AdminModel.findOne({ email: email })
    const isMatch = await bcrypt.compare(password, admin.password)
    res.status(200).json({ isMatch })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})

addAdmin.post('/add-admin', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(404).json({ message: `Not found: data` })
    }
    const { name, email, password } = req.body
    const hashPass = await bcrypt.hash(password, 10)
    connectDB()
    const admin = await AdminModel.create({
      name,
      email,
      password: hashPass,
    })
    res.status(200).json(admin)
  } catch (error) {
    if (error.code == 11000) {
      return res.status(409).json({
        success: false,
        message:
          'duplicate key error collection key: { email: "rabhirup605@gmail.com" }',
      })
    }
    res.status(404).json({ message: error })
  }
})

export default addAdmin
