function getHash(plaintext) {
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log(err)
            return;
        }

        bcrypt.hash(plaintext, salt, (err, hash) => {
            if (err) {
                console.log(err)
                return;
            }

            return hash;
        })
        
    })
}

module.exports = getHash