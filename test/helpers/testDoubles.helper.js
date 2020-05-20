import td from 'testdouble'


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
    },
    json: function(obj) {
        this._sendObj = JSON.stringify(obj)
    }
}

const MongooseTestDouble = {
    Schema: function() {
        return {
            methods : function() {}
        }
    },
    model: function() {}

}

export  {requestObj, responseObj, MongooseTestDouble}
