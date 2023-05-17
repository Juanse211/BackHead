const socket = io()

const form = document.getElementById('form')

const container = document.getElementById('container')

socket.emit('message', 'Hola es un mensaje desde el front end')

socket.on('evento_socket_individual', data => { console.log(data) })
socket.on('evento_todos_menos_actual', data => { console.log(data) })
socket.on('evento_todos', data => { console.log(data) })

socket.on('showProducts', data => {
  container.innerHTML = ``

  data.forEach(prod => {
    container.innerHTML += `
            <ul>
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
            </ul>
        `
  })
})