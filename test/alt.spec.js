import chai from 'chai'
chai.should()
import supertest from 'supertest'
import { mongoHelper } from './helpers/common.helper'
import match from './helpers/match.helper'

import {policy1, claim1} from './helpers/testObjects.helper'

let server // New app for each test flow

describe('Alternate Flow', () => {
    beforeEach(() => {
        server = require('../src/index')
        mongoHelper.createDoc('policies', policy1)
        mongoHelper.createDoc('claims', claim1)
    })

    it('can get all policy', async () => {
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
                validDate: "2018-01-01"
            })
            .set('Accept', 'application/json')
        console.log(`response${response.text}`)
        response.status.should.equal(200);
        Object.keys(response.body).should.be.eqls(['0'])
        match(policy1, response.body['0'], '_id')

        return response
    })

    it('can get all claims', async () => {
        const response = await supertest(server)
            .get(`/claims`)

        response.status.should.equal(200);
        Object.keys(response.body).should.be.eqls(['0'])
        match(claim1, response.body["0"], '_id')
        return response
    })

    it('can search a claim', async () => {
        const response = await supertest(server)
        .post('/claims/search')
        .send({
            "description": "test2"
        })
        .set('Accept', 'application/json')

        response.status.should.equal(200);
        Object.keys(response.body).should.be.eqls(['0'])
        match(claim1, response.body[0], '_id')
        return response
    })
})

