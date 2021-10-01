const faker = require('faker')

faker.locale = 'es'

const generateProduct = () => ({
    nombre: faker.name.findName(),
    price: faker.commerce.price(),
    picture: faker.image.avatar()
})

module.exports = {
    generateProduct
}