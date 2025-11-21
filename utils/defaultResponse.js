import { Task } from '../db/taskSchema.js'
import connectDB from './connectDB.js'

const defaultResponse = async (req, res) => {
  // await connectDB()
  // await Task.deleteMany({})

  res.status(200).json({
    url: `${req.protocol}://${req.get('host')}${req.url}`,
    message: 'This is a EMS(Employee management system) Rust API.',
    Data: 'Application/json',
  })
}

export default defaultResponse
