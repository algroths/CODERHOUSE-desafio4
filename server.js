const express = require('express')
const productosRouter = require('./productoRouter')
const app = express()


const middlewareRoot = (req, res, next) => {
    console.log('Request recibido a la ruta /')
    return next()
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', middlewareRoot, (req, res) => {
    return res.json({
        status: 'ok'
    })
})


app.use('/api/productos', productosRouter)
app.use('/static', express.static(__dirname + '/public'))

app.use((err, req, res, next) => {
    return res.status(500).json({
        error: 'Error, no se encuentra el producto'
    })
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando por el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))