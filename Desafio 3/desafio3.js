const endFunction = (number) => console.log(`Proceso Completo ! Ya se leyeron una cantidad total de ${number} palabras!!`)
const splitBySpace = texto => texto.split(' ')

const time = (timeout) => new Promise((resolv, reject) => {
    setTimeout(() => {
        resolv()
    }, timeout);
})


async function lectorTexto(str, ms = 1000, callback) {

    const vectorPalabra = splitBySpace(str)

    for (let i = 0; i < vectorPalabra.length; i++) {
        const palabra = vectorPalabra[i];
        console.log(palabra)
        await time(ms)
    }
    callback(vectorPalabra.length)

}

lectorTexto('Primer texto =>', 1500, endFunction)
    .then(() =>
        lectorTexto('Segundo texto =>', 1000, endFunction)
    )
    .then(() =>
        lectorTexto('Tercer texto =>', 3000, endFunction)
    ).finally(() => console.log('Desafio 3 terminado!'))