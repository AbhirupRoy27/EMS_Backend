import { AdminModel } from '../../db/adminSchema.js'
import bcrypt from 'bcrypt'

const adminLogin = async (req, res) => {
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
}

export default adminLogin
