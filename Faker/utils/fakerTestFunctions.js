import fs from 'fs'
import { faker } from '@faker-js/faker';

/*const cart = {
    id: faker.datatype.uuid,
    timestamp: faker.date.recent,
    products: []
}

const newMessage = {
    id: faker.datatype.uuid,
    user: faker.name.firstName,
    email: faker.internet.email,
    timestamp: faker.date.recent,
    message: faker.lorem.text
}
*/

const getAll = () => {
    const productList = []
    for (let displayOrder = 1; displayOrder < 100; displayOrder++) {
        productList.push({
            id: faker.random.alphaNumeric(10),
            displayOrder: displayOrder,
            name: faker.commerce.productName,
            tagProductType: faker.commerce.department,
            tag2: faker.commerce.productAdjective,
            tag3: faker.commerce.productAdjective,
            tag4: faker.commerce.productAdjective,
            tag5: faker.commerce.productAdjective,
            price: faker.commerce.price(400, 2000, 2, $),
            presentation: faker.mersenne.rand(250, 50),
            thumbnail: faker.image.abstract(200, 200, true),
            detailThumbnail: faker.image.abstract(300, 500, true),
            description: faker.lorem.paragraph(2),
            instructions: faker.lorem.paragraph(3),
        })
        return productList
    }
    const data = fs.writeFileSync('./products-test.json', JSON.stringify(productList, null, 2), 'utf-8')
    return data
}

const getById = (id) => {
    const data = JSON.parse(fs.readFileSync('./products-test.json', 'utf-8'))
    data.forEach(product => {
        if (product.id == id) {
            return product
        } else {
            return 'No se encontró el producto.'
        }
    });
}

export const fakerFunctions = { getAll, getById }


