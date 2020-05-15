import chai from 'chai'
chai.should()
import supertest from 'supertest'
import mongoHelper from './helpers/common.helper'
import match from './helpers/match.helper'
import { mongo } from 'mongoose'

let server // New app for each test flow

describe('Main Flow', () => {
    beforeEach(() => {
        server = require('../src/index')
        mongoHelper.createDoc('policies', policy1)
    })

    it('can view a policy', async () => {
        const response = await supertest(server)
            .get(`/policies/${policy1.policyNumber}`)

        response.status.should.equal(200);
        match(policy1, response.body, '_id')
        return response
    })

    it('can create a claim', async () => {
        const response = await supertest(server)
            .post('/claims')
            .send(claim1)
            .set('Accept', 'application/json')
        const claimNumber = response.body.claimNumber
        
        response.status.should.equal(201);
        
        const dbRecord = await mongoHelper.findOne('claims', {claimNumber: claimNumber})
        claim1.description.should.eql(dbRecord.description)
        claim1.policyNumber.should.eql(dbRecord.policyNumber)
        dbRecord.issues.length.should.equals(1)
        match(claim1.issues[0], dbRecord.issues[0], '_id')

        return response
    })

    it('can view a claim', async () => {
        const { _id } = await mongoHelper.createDoc('claims', claim1)
        const response = await supertest(server)
            .get(`/claims?claimNumber=${_id}`)

        response.status.should.equal(200);
        match(claim1, response.body[0], '_id')
        return response
    })



    afterEach(async () => {
        await mongoHelper.cleanup()
    })
})

const policy1 = {
    policyNumber: "P1",
    firstName: "John",
    lastName: "Tan",
    validDate: Date("2018-01-01"),
}
const claim1 = {
	"description": "test2",
	"policyNumber": "P1",
	"issues": [
		{"title": "tissue", "description": "tissue"}
	]
}