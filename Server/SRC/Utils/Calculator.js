const TotalCalculator = (cart) => {
    let total = 0
    const purchaseTotal = cart.forEach(product => {
        const subtotal = parseInt(product.productQuantity) * parseInt(product.productPrice)
        total = total + subtotal
        return total
    })
    return purchaseTotal
}

const UnitsCalculator = (cart) => {
    let total = 0
    const unitsTotal = cart.forEach(product => {
        subtotalUnits = parseInt(product.productQuantity)
        total = total + subtotal
        return total
    })
    return unitsTotal
}

const MaxIdCalculator = (data) => {
    let currentMaxId = 0
    let idsToCompare = []
    data.forEach(element => {
        idsToCompare.push(element.idNumber)
        if(idsToCompare.length == 0) {
            currentMaxId = 0
        } else {
            currentMaxId = Math.max(...idsToCompare)
        }
        return currentMaxId
    })
    return currentMaxId
}

module.exports = {TotalCalculator, UnitsCalculator, MaxIdCalculator}