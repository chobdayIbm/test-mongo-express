# Adding automated tests to a legacy application

## Infrastructure Setup
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

## First Test
Please look at `test/root.spec.js`
Run it whenever the codes change using 
`npm run test:watch`
Babel, nodemon and mocha need to be setup properly

To run coverage
`npm run coverage`

Before committing to git, update `.gitignore` to ignore nyc output

## Main Flow
Please look at `test/main.spec.js` and note how it makes use of _test helpers_.  
The module `supertest` is added because this is an Express app.
- Because the app starts an http server by calling listen, mocha needs to use the _exit_ flag
The module `mongodb-memory-server` is added to run tests quickly against MongoDB  

To test RabbitMQ, a test setup needs to be run.  An easy way to do it is by running 
`docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`
The uri will be _amqp://localhost_

Remember to run `npm run coverage` before committing.  For this example, it covers 


## Others Flow
Please look at `test/alt.spec.js` 

The aim of testing other flows is to reach a good test coverage.  However, the definition of _good_ is multi-faceted.
* The common, obvious answer of getting a contrived target, e.g. 100% or even 80% coverage is not useful.
* It is better to think of the risks of code that is not covered by automated tests.  
* For example, functions with many parameters are hard to test and may indicate a need for re-design.  
* Don't take my word for it, refer to https://martinfowler.com/bliki/TestCoverage.html

Testing exceptions takes more effort, as simulating the exception requires setting up the code under test and stubbing the dependencies.  Focus on the most important exceptions and there is less value in testing other exception code that follow this pattern.
Please look at `test/exception.spec.js`
The module `testdouble` is added for stubbing.




## Background of legacy app ##
It is a example of ~2014 Node.js Mongoose application, to CRUD for insurance policy and claim 

mongoose 3 uses bson@0.4.23 which has a ciritical issue with BSON serialization and will not work

