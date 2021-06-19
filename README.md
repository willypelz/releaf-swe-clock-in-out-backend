# Releaf SWE clock-in-out backend application.

Application that consume a API Client to ensure clock in and out of users 

1.  code architecture implemented repository design pattern,
3.  State Management: Vuex
4.  Test-driven development(TDD): mocha
5.  Request validation: Joi
6.  project dockerized;


# Getting started

There are two ways to set the project up and running the first one is the manual project setup 
and the other one is the docker setup.

## Installation A

Clone the repository

    git clone https://github.com/willypelz/releaf-swe-clock-in-out-backend.git

Switch to the repo folder

    cd releaf-swe-clock-in-out-backend
    
Install dependencies
    
    npm install

Copy config file 

    cp .env.example .env
    
----------

## Database
    
The project implements No-sql database(mongoDB)


----------

##### mongoDB

----------
    
Set mongo database settings in .env

    port=3500,
    env="development",
    NODE_ENV="development"
    mongoURI="mongodb://localhost:27017/staff_clock_in_out_app"
    AMQP_URL='amqp://guest:guest@localhost'
    mqServerUrl='amqp://guest:guest@localhost'

  
    
Start local mysql server and create new database 'staff_clock_in_out_app'

On application start, tables for all entities will be created.

## NPM scripts

- `npm start` - Start application 
- `npm run test` - run Jest test runner  

----------


## Start application

- `npm start`
- Test api with `http://localhost:3500` in your favourite browser

----------
 
 
## Installation B

### Requirement 
 - Docker
 - RAM (^4gb)
 
The second way of setting the project which is running it on docker

Clone the repository

    git clone https://github.com/willypelz/releaf-swe-clock-in-out-backend.git

Switch to the repo folder

    cd releaf-swe-clock-in-out-backend
    
### building and running the project

`` docker-compose up --build ``

this build and run the project together in docker container.

     1. clock_in_out_backend
     2. clock_in_out_database

## Start application

- `npm start`
- Test api with `http://localhost:3000` in your favourite browser
 

## API Documentation/access ( API docs)

This application documentation can be access in the apidoc folder generated after running the code below

`` npm run docs ``

`` apidoc/index.html``
----------

### Updates to be done

-improve the UI
-complete dockerization for the project
-refactor the code 
-complete the auth system
-connect ci/cd and connect it to live server for easy test.
