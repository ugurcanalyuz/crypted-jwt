const { createCipheriv, createDecipheriv, randomBytes } = require('crypto')
const thisAlgorithm = 'aes-256-ctr'
const thisIV = randomBytes(16)

exports.cryptoEncrypt = (text, secretKey) => {
    const thisCipher = createCipheriv(thisAlgorithm, secretKey, thisIV)
    const thisEncrypted = Buffer.concat([thisCipher.update(text), thisCipher.final()])
    return {
        CD: thisIV.toString('hex'),
        CC: thisEncrypted.toString('hex'),
    }
}

exports.cryptoDecrypt = (object, secretKey) => {
    const thisDecipher = createDecipheriv(thisAlgorithm, secretKey, Buffer.from(object.CD, 'hex'))
    const thisDecrypted = Buffer.concat([thisDecipher.update(Buffer.from(object.CC, 'hex')), thisDecipher.final()])
    return thisDecrypted.toString()
}

exports.randomHex = (count) => {
    return randomBytes(count).toString('hex')
}