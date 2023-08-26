const { sign, verify } = require('jsonwebtoken')
const { cryptoEncrypt, cryptoDecrypt, randomHex } = require('./crypto')

class CryptedJwt {
    constructor (options) {
        this.salt1 = options.salt1
        this.salt2 = options.salt2
        this.salt3 = options.salt3
        this.jsonSecretKey = options.jsonSecretKey
        this.expiresIn = options.expiresIn
        this.cryptoSecretKey = options.cryptoSecretKey
    }

    createToken = payload => {
        if (typeof(payload) !== 'object') {
            return "A payload must be an Object."
        } else {
            const jsonToken = sign(payload, this.jsonSecretKey, { expiresIn: this.expiresIn })
            const cryptoJsonWebToken = cryptoEncrypt(jsonToken, this.cryptoSecretKey)

            const randomText1 = randomHex(this.salt1)
            const randomText2 = randomHex(this.salt2)
            const randomText3 = randomHex(this.salt3)

            return `${randomText1}${cryptoJsonWebToken.CD}${randomText2}${cryptoJsonWebToken.CC}${randomText3}`
        }
    }

    parseToken = token => {
        try {
            const cryptoObject = {
                CD: token.substring((this.salt1 * 2), (this.salt1 * 2) + 32),
                CC: token.substring((this.salt1 * 2) + (this.salt2 * 2) + 32, token.length - (this.salt3 * 2))
            }
            const originalJsonWebToken = cryptoDecrypt(cryptoObject, this.cryptoSecretKey)

            if (originalJsonWebToken) {
                return verify(originalJsonWebToken, this.jsonSecretKey)
            } else {
                return false
            }
        } catch {
            return false
        }
    }
}

module.exports = CryptedJwt