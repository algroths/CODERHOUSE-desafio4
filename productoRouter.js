const { Router } = require('express')
const Contenedor = require('./Contenedor')

let cont = new Contenedor()

/*
let obj = [
    {
        title: "Producto1",
        price: 22,
        url: "http://www.Producto1.com",
        id: 1
    },
    {
        title: "Producto2",
        price: 22,
        url: "http://www.Producto2.com",
        id: 2
    },
    {
        title: "Producto3",
        price: 22,
        url: "http://www.Producto3.com",
        id: 3
    }
]

    ; (() => {
        for (let i = 0; i < obj.length; i++) {
            cont.save(obj[i]);
        }
    })();
*/

const productosRouter = Router()

productosRouter.get('', (req, res) => {

    return res.json(cont.getAll());
})

productosRouter.get('/:id', (req, res) => {

    let obj = cont.getByid(+req.params.id)

    if (obj != -1) {
        return res.json(obj)
    } else {
        throw new Error('Error')
    }
})

productosRouter.post('', (req, res) => {
    let obj = req.body
    obj.id = cont.productos.length + 1
    cont.save(obj)

    return res.status(201).json(obj)
})

productosRouter.put('/:id', (req, res) => {
    let obj = cont.updateProduct(req.body, +req.params.id)

    if (obj != -1) {
        return res.json(obj)
    } else {
        throw new Error('Error')
    }
})

productosRouter.delete('/:id', (req, res) => {
    let obj = cont.deleteById(+req.params.id)
    console.log(obj)
    if (obj != -1) {
        return res.status(204).json({})
    } else {
        throw Error('Error')
    }

})



module.exports = productosRouter