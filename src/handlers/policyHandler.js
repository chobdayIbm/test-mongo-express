var Policy = require("../models/policy")
var Common = require("./common");

function getAll(request, response) {
	Policy.find(function(err, policies) {
		if (err) {
			response.status(400).send(err);
		}
		else {
			var http = require('http')
			http.get('http://worldtimeapi.org/api/timezone/Asia/Singapore', function(resp) {
				var data = '';
				resp.on('data', function(chunk) {
					data += chunk;
				})
				resp.on('end', function() {
					if (resp.statusCode == 200)  {
						var dt = JSON.parse(data).datetime
						console.log(`Get all policies at ${dt}`)
					} else {
						console.log(`Response from http://worldtimeapi.org/api/timezone/Asia/Singapore  has status code ${resp.statusCode}`)
					}
					response.json(Common.toBasicCollection(policies));
				})
			})

		}
	});
}

function get(request, response) {
	Policy.findOne({"policyNumber": request.params.policyNumber}, function(err, policy) {
		if (err) {
			console.log(JSON.stringify(response))
			response.status(400).send(err);
		}
		else {
			response.json(policy.toBasic());
		}
	});
}

function search(request, response) {
	var searchObject = request.body;

	if (searchObject.validDate) {
		searchObject.validDate = new Date(searchObject.validDate);
	}

	if (searchObject.expirationDate) {
		searchObject.expirationDate = new Date(searchObject.expirationDate);
	}
	Policy.find(searchObject, function(err, policies) {
		if (err) {
			response.status(400).send(err);
		}
		else {
			response.json(Common.toBasicCollection(policies));
			console.log("Found %d records", policies.length);
		}
	});
}

exports.getAll = getAll
exports.get = get
exports.search = search