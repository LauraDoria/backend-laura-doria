const IdCompare = (data) => {
    let currentMaxId = 0
    let idsToCompare = []
    data.forEach(element => {
        idsToCompare.push(element.id)
        if(idsToCompare.length == 0) {
            currentMaxId = 0
        } else {
            currentMaxId = Math.max(...idsToCompare)
        }
        return currentMaxId
    })
    return currentMaxId
}

export default IdCompare