import express from 'express'
import defRoutes from './controllers/default.js'
const app = express()

app.use(express.json())

app.use('/', defRoutes)
app.use('/:url', defRoutes)

app.listen(3000, () => {
  console.log(`Server running on: http://localhost:3000`)
})

export default app
