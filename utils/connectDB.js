import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

let isConnected = false

export default async function connectDB() {
  if (isConnected) return
  try {
    await mongoose.connect(process.env.DB_URI)
    if (mongoose.connection.readyState === 1) {
      isConnected = true
      console.log(
        '✅ Mongoose is connected, DB_Name:',
        mongoose.connection.name
      )
    } else {
      console.log('⚠️ Mongoose is not connected')
    }
  } catch (err) {
    console.error('failed to connect to MongoDB', err)
  }
}
