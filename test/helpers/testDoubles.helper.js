import td from 'testdouble'

function FakeMongoose() {
    return {
        Schema: {
            methods : function() {}
        },
        model: function() {}
    }
}
// var mongooseTd = td.replace('mongoose', td.object(new FakeMongoose()))
// TODO move out as replace must be reset after test

const requestObj = {
    params: {}
}

const responseObj = {
    _status: -1,
    _sendObj: null,
    status: function(num) {
        this._status = num
        return responseObj
    },
    send: function(obj) {
        this._sendObj = obj
    }
}

module.exports = {requestObj, responseObj}