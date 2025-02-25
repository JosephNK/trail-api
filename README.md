# Trail-API

This project is designed to test various API cases.
It provides a framework for validating different API scenarios.
The goal is to ensure reliability and consistency in API behavior.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## How to use

Timeout test
```bash
GET http://localhost:3000/api/timeout?delay=3000
```

404 test (force)
```bash
GET http://localhost:3000/api/notfound?force=true
```

404 test (resource)
```bash
GET http://localhost:3000/api/resources/999
```
