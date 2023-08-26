# Crypted JWT

This small library hashes the generated regular JWT keys with three different numbers and enables you to parse it later on. If you don't share these numbers with anyone, it becomes nearly impossible to crack.
## Installation

```bash
npm install crypted-jwt
or
yarn add crypted-jwt
```

## Usage
```js
const CJWT = require('crypted-jwt')

// Firstly, we send settings in this way and create a Class.
// salt1, salt2, and salt3 determine your encryption keys. Do not share these with anyone!
const options = {
    salt1: 10,
    salt2: 20,
    salt3: 30,
    jsonSecretKey: 'string',
    expiresIn: '365d',
    cryptoSecretKey: 'only 32 character string'
}

// Create Class
const CJ = new CJWT(options)

// It generates a hashed token for you by sending the object as a payload.
const token = CJ.createToken({ id: 1 })

// You can query the generated token when it arrives at the service later on.
const bearerToken = 'testtoken'
const parse = CJ.parseToken(bearerToken)
```

Good Works.