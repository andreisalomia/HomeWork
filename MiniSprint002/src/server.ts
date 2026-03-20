import express from 'express'
import { sequelize } from './models'
const app = express()
const port = 3000

sequelize.sync().then(() => {
  console.log('Database synced')
}).catch((err: unknown) => {
  console.error('Error syncing database:', err)
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})