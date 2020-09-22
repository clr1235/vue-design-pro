function chart(method) {
    let res = null
    switch (method) {
        case 'GET':
            res = [78, 40, 20, 10, 30, 48]
            break;
        default:
            res = null
    }
    return res
}

module.exports = chart