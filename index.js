import express from 'express'
import productsJson from './products.json'

const app = express()
const port = 8080
app.use(express.urlencoded({ extended: true }))
app.listen(port)

app.get('/', (req, res) => {
  const query = req.query
  const entries = Object.entries(query)
  if (entries.length = 0) {
    return res.send({ productsJson })
  }
  const filtrados = productsJson.filter(() => {
    return entries.every(([clave, valor]) => u[clave] == valor)
  })
  res.send({ productsJson: filtrados })
})