const defaultResponse = async (req, res) => {
  // await connectDB()

  // const count = await Employee.countDocuments({ deadline: { $type: 'string' } })
  res.status(200).json({
    status: true,
    message: 'Employee Working fine!',
    url: req.originalUrl,
    // DB: count,
  })
}

export default defaultResponse
