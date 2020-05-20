import chai from 'chai'
chai.should()

import { mongoHelper } from './helpers/common.helper'

before('Runs before all tests suites', async () => {
    console.log(`Tests start at ${new Date()}`)
    await mongoHelper.start()
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