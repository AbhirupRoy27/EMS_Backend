import { Employee } from '../../db/empSchema.js'
import { Task } from '../../db/taskSchema.js'
import connectDB from '../../utils/connectDB.js'

const getTask = async (req, res) => {
  try {
    if (req.body.email) {
      await connectDB()
      const user = await Employee.findOne(
        { email: req.body.email },
        { _id: 0, password: 0, position: 0, department: 0, joinedAt: 0, __v: 0 }
      )
      if (!user) {
        res.status(404).json({
          status: false,
          message: 'No user found.',
          email: req.body.email,
        })
      }

      // const Tasks = await Task.find({ email })

      res.status(200).json({
        status: true,
        message: 'List of all tasks.',
        user,
      })
    }

    throw new Error('Email Missing in body.')
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: 'Not Found', error: error.message })
  }
}

export default getTask
