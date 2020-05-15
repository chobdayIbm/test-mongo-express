import chai from 'chai'
chai.should()

before('Runs before all tests suites', () => {
    console.log(`Tests start at ${new Date()}`)
})

describe('Test infrastructure', () => {
    it('is running', async () => {
        const result = await new Promise((resolve,reject) => resolve())
        return result
    })
})

after('Runs after all tests suites', () => {
    console.log(`Tests end at ${new Date()}`)
})