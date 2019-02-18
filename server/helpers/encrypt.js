const bcrypt = require('bcrypt')



function encrypt(user,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            callback(err,null)
        } else {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err){
                    callback(err,null)
                } else {
                    callback(null,hash)
                }
            });
        }   
    });
}

function decrypt(plainPassword, hashPassword) {
    return bcrypt.compare(plainPassword,hashPassword)
}

module.exports = {encrypt, decrypt}