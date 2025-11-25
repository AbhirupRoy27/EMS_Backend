export const serverError = (res, error) => {
  return res.status(500).json({
    status: false,
    message: error.message,
    error: error.code,
  })
}

export const errorEmptyBody = (res, error = {}) => {
  const code = error.code || 'BAD REQUEST'
  const statusCode = error.statusCode || 422

  return res.status(statusCode).json({
    status: false,
    code,
    message: `${code}: Request body is empty. Please provide valid data to proceed.`,
  })
}

export default function routeNotfound(req, res) {
  return res.status(404).json({
    url: `${req.protocol}://${req.get('host')}${req.url}`,
    Data: 'unauthorized',
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  })
}
