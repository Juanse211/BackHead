import  express  from 'express'

const app = express()
const port = 8080
app.use(express.urlencoded({ extended: true }))
app.listen(port, () => console.log(`Express listening on port: ${port}`))

const users = [
  {id: 1, nombre: "abel", apellido: "bonilla", edad:22, genero: "M"},
  {id: 2, nombre: "lucas", apellido: "torres", edad:24, genero: "M"},
  {id: 3, nombre: "lucia", apellido: "maria", edad:27, genero: "F"},
]

app.get('/find-users', (req, res) => {
  const {genero, edad, nombre} = req.query
  res.send({genero, edad, nombre})
})

app.get('/user/:id', (req, res) => {
  const userId = Number(req.params.id)
  const user = users.find(u => u.id === userId)
  res.send(user)
  console.log(userId)
})
/*
app.get('/usuarios', (req, res) => {
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


app.get('/:userId', (req, res) => {
  const { unParametro, otroParametro } = req.params
  res.send(`Se recibieron los parametros ${unParametro} y ${otroParametro}`)
}

app.get('/bienvenida', (req, res) => {
  res.send(`<body> 
  <p  style="color:blue">Bienvenido</p>
  </body>`)
})

app.get('/:unParametro', (req, res) => {
  const { unParametro } = req.params
  res.send(`se recibio el parametro: ${unParametro}`)
})

app.get('/:unParametro/:otroParametro', (req, res) => {
  const { unParametro, otroParametro } = req.params
  res.send(`Se recibieron los parametros ${unParametro} y ${otroParametro}`)
})

*/