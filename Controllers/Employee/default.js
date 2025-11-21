import { Employee } from '../../db/empSchema.js'
import connectDB from '../../utils/connectDB.js'

const defaultResponse = async (req, res) => {
  // await connectDB()

  // await Employee.collection.dropIndexes()
  // await Employee.syncIndexes()

  // const count = await Employee.countDocuments({ deadline: { $type: 'string' } })
  res.status(200).json({
    status: true,
    message: 'Employee Working fine!',
    url: req.originalUrl,
    // DB: count,
  })
}

export default defaultResponse
