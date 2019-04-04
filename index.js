require('dotenv').config()
const express = require('express');
const massive = require('massive')
const productsController = require('./products_controller')

const app = express()

app.use(express.json())
const { PORT, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING)
    .then(db => { 
        app.set('db', db)
    }).catch(err => { 
        console.log(err)
    })

app.get('/api/products', productsController.getAll)
app.get('/api/products/:id', productsController.getOne)
app.put('/api/products/:id', productsController.update)
app.post('/api/products', productsController.create)
app.delete('/api/products/:id', productsController.delete)

app.listen(PORT, () => { 
    console.log(`App is listening on port ${PORT}`)
})