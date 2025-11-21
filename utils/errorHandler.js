export const serverError = (res, error) => {
  res.status(500).json({
    status: false,
    message: error.message,
    error: error.code,
  })
}

export const errorEmptyBody = (res, error) => {
  res.status(500).json({
    status: false,
    message: `the Body is empty, please give some date to go forward. `,
    error: error.code,
  })
}

export default function routeNotfound(req, res) {
  res.status(404).json({
    url: `${req.protocol}://${req.get('host')}${req.url}`,
    Data: 'unauthorized',
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  })
}
