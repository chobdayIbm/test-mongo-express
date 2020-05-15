import chai from 'chai'
chai.should()
import supertest from 'supertest'
import mongoHelper from './common.helper'
import match from './match.helper'
import { mongo } from 'mongoose'

let server // New app for each test flow

describe('Main Flow', () => {
    beforeEach(() => {
        server = require('../src/index')
    })
    it('can view a policy', async () => {
        const policy1 = {
            policyNumber: "P1",
            firstName: "John",
            lastName: "Tan",
            validDate: Date("2018-01-01"),
        }
        mongoHelper.createDoc('policies', policy1)
        const response = await supertest(server)
            .get(`/policies/${policy1.policyNumber}`)
        
        response.status.should.equal(200);
        const result = response.body
        // console.log (response.body)
        match(policy1, result, '_id')
        return response
    })



    afterEach(async () => {
        await mongoHelper.cleanup()
    })
})


