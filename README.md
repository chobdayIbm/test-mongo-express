# Adding automated tests to a legacy application #

## Infrastructure Setup ##
The first step is to setup the test infrastructure 

Note the updated `package.json` with new dev dependencies
```
npm install --save-dev mocha mochawesome chai nodemon nyc
npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env @babel/register
```
Babel is used so that test code can use the latest Javascript features.  Even Node 12 needs the **experimental** flag to support *import*

Note the configurations in 
* .mocharc.yaml
* .nycrc.yaml
* nodemon.json

## First Test **
Please look at `test/root.spec.js`
Run it whenever the codes change using 
```
npm run test:watch
```
Babel, nodemon and mocha need to be setup properly

To run coverage
```
npm run coverage
```

Before committing to git, update `.gitignore` to ignore nyc output



## Background of legacy app ##
It is a example of ~2014 Node.js Mongoose application, to CRUD for insurance policy and claim 

mongoose 3 uses bson@0.4.23 which has a ciritical issue with BSON serialization and will not work

### To create the test data
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
###