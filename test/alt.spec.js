import chai from 'chai'
chai.should()
import supertest from 'supertest'
import mongoHelper from './helpers/common.helper'
import match from './helpers/match.helper'

let server // New app for each test flow

describe('Alternate Flow', () => {
    beforeEach(() => {
        server = require('../src/index')
        mongoHelper.createDoc('policies', policy1)
    })

    it.only('can get all policy', async () => {
        const response = await supertest(server)
            .get(`/policies`)

        response.status.should.equal(200);
        Object.keys(response.body).should.be.eqls(['0'])
        match(policy1, response.body["0"], '_id')
        return response
    })

    it('can search a policy', async () => {
        const response = await supertest(server)
            .post('/policies/search')
            .send({
                validDate: "2018-01-01 00:00:00+00:00"
            })
            .set('Accept', 'application/json')
        // const claimNumber = response.body.claimNumber
        console.log(`response${response.text}`)
        response.status.should.equal(200);
        
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
    validDate: new Date("2018-01-01"),
}
const claim1 = {
	"description": "test2",
	"policyNumber": "P1",
	"issues": [
		{"title": "tissue", "description": "tissue"}
	]
}