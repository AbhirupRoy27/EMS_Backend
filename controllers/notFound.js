export default function routeNotfound(req, res) {
  res.status(404).json({
    url: `${req.protocol}://${req.get('host')}${req.url}`,
    Data: 'unauthorized',
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  })
}
