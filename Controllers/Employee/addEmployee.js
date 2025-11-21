import { Employee } from '../../db/empSchema.js'
import { defaultError } from '../../utils/commonResponse.js'
import connectDB from '../../utils/connectDB.js'
import duplicateValueError from '../../utils/duplicateValueError.js'
import { employeeDataFormatter } from '../../utils/empFormatter.js'

const addEmployee = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error('No Body Provided: [Body Empty]')
    }

    await connectDB()
    const data = await employeeDataFormatter(req)
    const updated = await Employee.create(data)
    console.log(updated)
    return dataAdded(res, updated)
  } catch (error) {
    if (error.code === 11000) {
      return duplicateValueError(res, error)
    }
    defaultError(res, error)
  }
}

export default addEmployee
