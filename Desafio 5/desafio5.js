const http = require('http')

const server = http.createServer((req, res) => {

    let ob = []
    for (let i = 0; i < 5; i++)
        ob.push({
            id: random(1, 10),
            title: `Producto ${random(1, 10)}`,
            price: random(0, 9999.99, 2),
            thumbnail: `Foto ${random(1, 10)}`

        })

    //JSON.parse("[{},{},{}]") //convierte el texto y convertirlo en objeto
    res.end(JSON.stringify(ob)) //convierte el objeto y lo convierte en texto
})

server.listen(8080, function () {
    console.log('tu servidor esta listo en ' + this.address().port);
})

random = (min, max, decimals = 0) => {
    return decimals === 0 ? (Math.floor(Math.random() * (max - min) + min)) : ((Math.random() * (max - min) + min).toFixed(decimals))
}

