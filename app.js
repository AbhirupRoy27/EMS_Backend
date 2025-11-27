import express from 'express'
import cors from 'cors'
import defRoutes from './routes/default.js'
import adminRouter from './routes/admin.js'
import employee from './routes/employee.js'
import routeNotfound from './utils/errorHandler.js'
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://worksync-emp.netlify.app/'],
  })
)

app.use('/api/admin', adminRouter)
app.use('/api/employee', employee)
app.use('/', defRoutes)
app.use(routeNotfound)

app.listen(3000, () => {
  console.log(`Server running on: http://localhost:3000`)
})

export default app
