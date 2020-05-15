// mongoose 3 uses bson@0.4.23 which has a ciritical issue with BSON serialization

db.policies.insertOne({
    policyNumber: "12",
    firstName: "John",
    lastName: "Tan",
    validDate: new Date("2018-01-01"),
})

Insert claim
{
	"description": "test2",
	"policyNumber": "12",
	"issues": [
		{"title": "tissue", "description": "tissue"}
	]
}