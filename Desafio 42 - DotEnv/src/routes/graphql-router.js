// const express = require('express');
// const router = express.Router()
// var { graphqlHTTP } = require('express-graphql');
// var { buildSchema } = require('graphql');
// const productSchema = require('../schemas/products')

// // const {Mongo} = require("../database")
// // const db = new Mongo


// // GraphQL schema
// //https://graphql.org/graphql-js/basic-types/
// var schema = buildSchema(`
//     type Query {
//         message: String,
//         messages: [String],
//         numero: Int,
//         numeros: [Int],
//         productos: [Producto]
//     },
    
//     type Producto {
//         _id: String
//         date: String
//         name: String
//         description: String
//         code: Int
//         picture: String
//         price: Float
//         stock: Int
//         qty: Int
//     },
//     input ProductoInput {
//         name: String
//         description: String
//         code: Int
//         picture: String
//         price: Float
//         stock: Int
//         qty: Int
//     },
//     type Mutation {
//         createProduct(input: ProductoInput): Producto
//     }
// `);

// var getProducts = function () {
//     try {
//         const prodsSave = await productSchema.find()
//         if (prodsSave.length > 0) {
//             return prodsSave
//         }
//         else {
//             return { message: "No existen productos todavía" }
//         }

//     } catch (err) {
//         console.error(err)
//     }
// }

// // Root resolver
// var root = {

//     message: () => 'Hola Mundo!',
//     messages: () => 'Hola Mundo!'.split(' '),
//     numero: () => 123,
//     numeros: () => [1, 2, 3],
//     productos: getProducts,
//     createProduct: ({ input }) => {
//         try {

//             let prod = {
//                 name: input.name,
//                 description: input.description,
//                 code: input.code,
//                 picture: input.picture,
//                 price: input.price,
//                 stock: input.stock,
//             }
//             const newProd = new productSchema(prod)
//             await newProd.save()
//             return newProd

//         } catch (err) {
//             res.status(404).json(err)
//         }
//     }
// };

// router.use('/', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));


// module.exports = router;