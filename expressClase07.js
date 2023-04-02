import { express } from 'express'
import { faker } from '@faker-js/faker/locale/es'
import { min } from 'date-fns'

const app = express()
const port = 8080
app.use(express.urlencoded({ extended: true }))
app.listen(port, () => console.log(`Express listening on port: ${port}`))

app.get('/:querys', (req, res) => {
  res.send(req.query)
})



app.get('/', (req, res) => {
  const query = req.query
  const entries = Object.entries(query)
  if (entries.length = 0) {
    return res.send({ usuarios })
  }
  const filtrados = usuarios.filter(() => {
    return entries.every(([clave, valor]) => u[clave] == valor)
  })
  res.send({ usuarios: filtrados })
})
/*
app.get('/:userId', (req, res) => {
  const { unParametro, otroParametro } = req.params
  res.send(`Se recibieron los parametros ${unParametro} y ${otroParametro}`)
}

app.get('/:unParametro/:otroParametro', (req, res) => {
  const { unParametro, otroParametro } = req.params
  res.send(`Se recibieron los parametros ${unParametro} y ${otroParametro}`)
})

app.get('/bienvenida', (req, res) => {
  res.send(`<body> 
  <p  style="color:blue">Bienvenido</p>
  </body>`)
})

app.get('/:unParametro', (req, res) => {
  const { unParametro } = req.params
  res.send(`se recibio el parametro: ${unParametro}`)
})

app.get('/user', (req, res) => {
  const nombre = faker.name.firstName()
  const apellido = faker.name.lastName()
  res.send({
    nombre,
    apellido,
    edad: faker.datatype.number({ min: 18, max: 90 }),
    correo: faker.helpers.unique(faker.internet.email, [nombre, apellido])
  })
})

*/