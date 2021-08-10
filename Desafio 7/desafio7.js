//Para correr nodemon no me deja import express from 'express' y lo hago con require()
const express = require('express')
const fs = require('fs')

//Creo pagina con express
const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`servidor inicializado en localhost:${server.address().port}`)
})
// Genero los GET de las Rutas solicitadas en el Desafio
app.get('/', (req, res) => {
    res.json({
        route1: '/items',
        route2: '/item-random',
        route3: '/visitas'
    })
})
app.get('/items', (req, res) => {
    try {
        visitas.items++
        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            res.json({
                items: productos,
                cantidad: productos.length
            })
        })
    } catch (error) {
        console.log('Error en /items', error)
    }
})

app.get('/item-random', (req, res) => {
    try {
        visitas.itemsRandom++
        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const indiceRandom = random(0, productos.length - 1)
            res.json({
                item: productos[indiceRandom]
            })
        })
    } catch (error) {
        console.log('Error en /item-Random', error)
    }
})

const visitas = {
    items: 0,
    itemsRandom: 0
}
app.get('/visitas', (req, res) => {
    try {
        res.json({ visitas: visitas })
    } catch (error) {
        console.log('Error en /visitas', error)
    }
})

//Defino funcion Random
random = (min, max, decimals = 0) => {
    return decimals === 0 ? (Math.floor(Math.random() * (max - min) + min)) : ((Math.random() * (max - min) + min).toFixed(decimals))
}

