import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(`
    type Product {
        idNumber: Number,
        productCode: String,
        stock: Number,
        name: String,
        productType: String,
        skinType: String,
        hairType: String,
        function: String,
        zeroWaste: String,
        price: Number,
        presentation: String,
        thumbnail: String,
        detailThumbnail: String,
        description: String,
        instructions: String,
        inci: String
    }
    type User {
        idNumber: Number,
        username: String,
        name: String,
        password: String,
        email: String,
        isAdmin: Boolean,
        cart: Array
    }
    input ProdutInput {
        productCode: String,
        stock: Number,
        name: String,
        productType: String,
        skinType: String,
        hairType: String,
        function: String,
        zeroWaste: String,
        price: Number,
        presentation: String,
        thumbnail: String,
        detailThumbnail: String,
        description: String,
        instructions: String,
        inci: String
    }
    input UserInput {
        username: String,
        name: String,
        password: String,
        email: String,
    }
    type Query {
        getProduct(idNumber: Number) {
            stock: Number,
            name: String,
            productType: String,
            skinType: String,
            hairType: String,
            function: String,
            zeroWaste: String,
            price: Number,
            presentation: String,
            detailThumbnail: String,
            description: String,
            instructions: String,
            inci: String
        },
        getAllProducts() {
            idNumber: Number,
            name: String,
            price: Number,
            presentation: String,
            thumbnail: String,
        }
        getUser(idNumber: Number) {
            username,
            name,
            email,
            isAdmin,
            cart
        },
        getAllUsers() {
            idNumber,
            username,
            name,
            email,
            isAdmin
        },
        getProductsInCart(numberId: Number) {
            cart
        }
    }
    type Mutation {
        addProduct(data: ProductInput): Product,
        updateProduct(numberId: Number, data: ProductInput): Product,
        deleteProduct(numberId: Number): Product,
        deleteAllProducts(): Product,
        addUser(data: UserInput): User,
        updateUser(numberId: Number, data: UserInput): User,
        deleteUser(numberId: Number): User,
        deleteAllUsers(): User
    }
`)

const GraphQL = app.use('/graphQL', graphqlHTTP({
    schema: schema,
    rootValue: {
        getUser,
        getAllUsers,
        addUser,
        updateUser,
        deleteUser
    },
    graphiql: true
}))

export default GraphQL