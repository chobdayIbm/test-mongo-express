import chai from 'chai'
chai.should()
import td from 'testdouble'
import {requestObj, responseObj, MongooseTestDouble} from './helpers/testDoubles.helper'


describe('Important exception Flows', () => {
    describe('Policy Handler', () => {
        let PolicyHandler, Policy

        beforeEach(() => {
            Policy = td.replace('../src/models/policy', td.object(['findOne']))
            PolicyHandler = require('../src/handlers/policyHandler')
        })

        it('should send an error code when there is an error getting the policy ', () => {
            const errorMessage = 'Random unexpected error'
            const policy = null
            td.when(Policy.findOne(td.matchers.anything())
                ).thenCallback(errorMessage, policy)

            PolicyHandler.get(requestObj, responseObj)

            responseObj._status.should.equal(400)
            responseObj._sendObj.should.equal(errorMessage)
        })

    })

    describe('Main Handler', () => {
        let ClaimHandler, PolicyHandler, Handlers, router
    
        beforeEach(() => {
            const mongoose = td.replace('mongoose', MongooseTestDouble) //used internally on initialization
            PolicyHandler = td.replace('../src/handlers/policyHandler')
            ClaimHandler = td.replace('../src/handlers/claimHandler')
    
            Handlers = require('../src/handlers')
        })
    
        it('a flow just to verify handlers are set up ', () => {
            const router = {
                paths : [],
                get: function(str, cb) {
                    try {
                        this.paths.push(str)
                        cb(requestObj, responseObj)
                    }catch(e) {
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

    afterEach(()=> {
        td.reset()
    })
})


