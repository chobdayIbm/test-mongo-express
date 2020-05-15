const match = (expectedResult, result, ...exceptionFields) => {
    const expectedResultClone = Object.assign({}, expectedResult)
    const resultClone = Object.assign({}, result)
    Object.entries(expectedResultClone).forEach(([key, value]) => {
        if (exceptionFields.includes(key)) {
            delete expectedResultClone[key]
        }
        if (key.toLowerCase().includes('date')) {
            expectedResultClone[key] = Date.parse(expectedResult[key])
        }
    })
    Object.entries(resultClone).forEach(([key, value]) => {
        if (exceptionFields.includes(key)) {
            delete resultClone[key]
        }
        if (key.toLowerCase().includes('date')) {
            resultClone[key] = Date.parse(resultClone[key])
        }
    })
    expectedResultClone.should.eql(resultClone)
}

module.exports = match