import { Router } from 'express'

const defRoutes = Router()

defRoutes.get('/', (req, res) => {
  res.status(200).json({
    url: `${req.protocol}://${req.get('host')}${req.url}`,
    message: 'This is a EMS(Employee management system) Rust API.',
    Data: 'Application/json',
  })
})

defRoutes.get('/:url', (req, res) => {
  res.status(200).json({
    url: `${req.protocol}://${req.get('host')}${req.url}`,
    message: 'This is a EMS(Employee management system) Rust API.',
    Data: 'Application/json',
  })
})

export default defRoutes
