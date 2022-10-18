const randomGenerator = (input) => {
    const requested = input
    if (input == null) requested = 100000000
    const randomArray = []
    for (let i = 0; i < requested; i++) {
        const randomNumber = Math.floor(Math.random())
        randomArray.push(randomNumber)
    }
    return randomArray
}

process.on('message', input => {
    process.send(randomGenerator(parseInt(input)))
    process.exit
})
