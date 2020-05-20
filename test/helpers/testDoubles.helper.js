import td from 'testdouble'


const MongooseTestDouble = {
    Schema: function(fields) {
        return {
            fields: fields,
            methods: {
                    'find': function(){},
                    'findOne': function(){},
                    'findById': function(){},
                    'count': function(){},
                    'remove': function(){},
                    'distinct': function(){},
                    'where': function(){},
                    'update': function(){},
            },
        }
    },
    model: function(name, schema2) {
        const result = {}
        Object.keys(schema2.fields).forEach(key => {
            result[key] = schema2.fields[key]
        })
        Object.keys(schema2.methods).forEach(key => {
            result[key] = schema2.methods[key]
        })
        return result
    }
}

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


export  {requestObj, responseObj, MongooseTestDouble}
