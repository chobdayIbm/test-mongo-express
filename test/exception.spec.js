import chai from 'chai'
chai.should()
import td from 'testdouble'
import {requestObj, responseObj, MongooseTestDouble} from './helpers/testDoubles.helper'

import nock from 'nock'
import supertest from 'supertest'
import { mongoHelper } from './helpers/common.helper'
import match from './helpers/match.helper'

import {policy1, claim1} from './helpers/testObjects.helper'

describe('Important exception Flows', () => {
    describe('Policy Handler', () => {
        it('should handle error from world time api gracefully', async() => {
            nock('http://worldtimeapi.org/api') //mock internal API call using Nock.js
            .get('/timezone/Asia/Singapore')
            .reply(404); 

 
            mongoHelper.createDoc('policies', policy1)
            mongoHelper.createDoc('claims', claim1)
            const server = require('../src/index')
            const response = await supertest(server)
            .get(`/policies`)

            response.status.should.equal(200);
            Object.keys(response.body).should.be.eqls(['0'])
            match(policy1, response.body["0"], '_id')
            return response

        })

        it('should send an error code when there is an error getting the policy ', () => {
            const Policy = td.replace('../src/models/policy', td.object(['findOne']))
            const PolicyHandler = require('../src/handlers/policyHandler')

            const errorMessage = 'Random unexpected error'
            const policy = null
            td.when(Policy.findOne(td.matchers.anything()))
                .thenCallback(errorMessage, policy)
            PolicyHandler.get(requestObj, responseObj)

            responseObj._status.should.equal(400)
            responseObj._sendObj.should.equal(errorMessage)
        })
    })

    describe.skip('Main Handler', () => {
        let ClaimHandler, PolicyHandler, Handlers, router
    
        beforeEach(() => {

        })
    
        it('a flow just to verify handlers are set up ', () => {
            // Do not use this if there is no exception handling in the main file
            const mongoose = td.replace('mongoose', MongooseTestDouble) //used internally on initialization
            PolicyHandler = td.replace('../src/handlers/policyHandler')
            ClaimHandler = td.replace('../src/handlers/claimHandler')
            Handlers = require('../src/handlers')

            const router = {
                paths : [],
                get: function(str, cb) {
                    try {
                        this.paths.push(str)
                        cb(requestObj, responseObj)
                    } catch(e) {
                        console.error(e)
                    }
                },
                post: function() {}
            }
    
            Handlers.setupHandlers(router)
    
            router.paths.includes("/policies").should.be.true
            td.verify(PolicyHandler.get(), {ignoreExtraArgs: true}) //verifies that the router is connected
        })
    })

    describe('Model', () => {
        it('a flow just to verify model is set up ', () => {
            // Do not use this if there is no exception handling in the model file
            const mongoose = td.replace('mongoose', MongooseTestDouble) //used internally on initialization
            const Policy = require('../src/models/policy.js')

            Policy.should.have.property('policyNumber')
            Policy.findOne.should.be.an.instanceof(Function)
            Policy.valid.should.be.an.instanceof(Function)
        })
    })

    afterEach(()=> {
        td.reset()
    })
})


