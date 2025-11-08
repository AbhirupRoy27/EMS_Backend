const duplicateValueError = async (res, error) => {
  res.status(409).json({
    status: false,
    message: error.keyValue,
  })
}

export default duplicateValueError
