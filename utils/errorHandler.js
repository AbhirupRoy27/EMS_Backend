export const serverError = (res, error) => {
  res.status(500).json({
    status: false,
    message: error.message,
    error: error.code,
  })
}
