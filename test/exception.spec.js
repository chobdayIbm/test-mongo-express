import chai from 'chai'
chai.should()
import td from 'testdouble'
import {requestObj, responseObj} from './helpers/testDoubles.helper'

let PolicyHandler, Policy
describe('Exception Flow', () => {
    beforeEach(() => {
        // var mongoose = td.replace('mongoose', td.object(new FakeMongoose()))
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

    afterEach(()=> {
        td.reset()
    })
})