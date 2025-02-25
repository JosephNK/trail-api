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

Timeout

```js
try {
    console.log(`Testing API with ${timeout}ms client timeout...`);
    
    const response = await axios.get('http://localhost:3000/timeout', {
      params: { delay: 5000 }, // 5초 지연 (서버측)
      timeout: 2000, // 클라이언트 타임아웃 설정 (2초)
    });
    
    console.log('Response:', response.data);
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out!');
    } else {
      console.error('Error:', error.message);
    }
  }
```
