const Router = require('koa-router')

const router = new Router({
    prefix: '/books'
})

let books = [
    { id: 101, name: 'Fight Club', author: 'Chuck Palanniuk' },
    { id: 102, name: 'Fight Club 2', author: 'Chuck Palanniuk' },
    { id: 103, name: 'Fight Club 3', author: 'Chuck Palanniuk' },
    { id: 104, name: 'Fight Club 4', author: 'Chuck Palanniuk' },
    { id: 105, name: 'Fight Club 5', author: 'Chuck Palanniuk' },
    { id: 106, name: 'Fight Club 6', author: 'Chuck Palanniuk' },

]

router.get('/', (ctx, next) => {
    ctx.body = {
        status: 'success',
        message: books
    }
    next()
})

router.get('/:id', (ctx, next) => {
    let getCurrentBook = books.filter(function (book) {
        if (book.id == ctx.params.id) {
            return true
        }
    })

    if (getCurrentBook.length) {
        ctx.body = getCurrenBook[0]
    } else {
        ctx.response.status = 404
        ctx.body = {
            status: 'Error!',
            message: 'Book Not Found with that id!'
        }
    }
    next()
})

router.post('/new', (ctx, next) => {
    if (
        !ctx.request.body.id ||
        !ctx.request.body.name ||
        !ctx.request.body.author
    ) {
        ctx.response.status = 400
        ctx.body = {
            status: 'Error',
            message: 'Please enter the data'
        }
    } else {
        let newBook = books.push({
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            author: ctx.request.body.author
        })
        ctx.response.status = 201
        ctx.body = {
            status: 'success',
            message: `New Book added with id: ${ctx.request.body.id} & name: ${ctx.request.body.name}`
        }
    }
    next()
})


router.put('/update/:id', (ctx, next) => {
    if (
        !ctx.request.body.id ||
        !ctx.request.body.name ||
        !ctx.request.body.author
    ) {
        ctx.response.status = 400
        ctx.body = {
            status: 'error',
            message: ' Please enter data'
        }
    } else {
        let id = ctx.params.id
        let index = books.findIndex(book => book.id == id)
        books.splice(index, 1, ctx.response.body)
        ctx.response.status = 201
        ctx.body = {
            status: 'success',
            message: `New Book added with id: ${ctx.request.body.id} & name: ${ctx.request.body.name}`
        }
    }
    next()
})

router.delete('/delete/:id', (ctx, next) => {
    let id = ctx.params.id
    let index = books.findIndex(book => book.id == id)
    books.splice(index, 1, ctx.response.body)
    ctx.response.status = 200
    ctx.body = {
        status: 'success',
        message: `Book deleted with id ${id}`
    }
    next()
})