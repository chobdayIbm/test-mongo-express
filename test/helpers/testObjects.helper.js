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

module.exports = {policy1, claim1}