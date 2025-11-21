import { AdminModel } from '../../db/adminSchema.js'
import { dataAdded, defaultError } from '../../utils/commonResponse.js'
import connectDB from '../../utils/connectDB.js'
import bcrypt from 'bcrypt'
import duplicateValueError from '../../utils/duplicateValueError.js'
import { errorEmptyBody } from '../../utils/errorHandler.js'

const addAdmin = async (req, res) => {
  try {
    if (!req.body) {
      const err = new Error('Empty Body')
      err.code = 400
      throw err
    }
    const { name, email, password } = req.body
    const hashPass = await bcrypt.hash(password, 10)
    await connectDB()
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
    if (error.message == 'Empty Body') {
      return errorEmptyBody(res, error)
    }
    defaultError(res, error)
  }
}

export default addAdmin
