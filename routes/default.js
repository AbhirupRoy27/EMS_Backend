import { Router } from 'express'
import defaultResponse from '../utils/defaultResponse.js'

const defRoutes = Router()

defRoutes.get('/', defaultResponse)

export default defRoutes
