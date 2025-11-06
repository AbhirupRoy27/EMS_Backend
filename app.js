import express from 'express'
import cors from 'cors'
import defRoutes from './controllers/default.js'
import addAdmin from './controllers/admin.js'
import routeNotfound from './controllers/notFound.js'
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/admin', addAdmin)
app.use('/', defRoutes)
app.use(routeNotfound)

app.listen(3000, () => {
  console.log(`Server running on: http://localhost:3000`)
})

export default app
