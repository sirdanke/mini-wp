const mongoose = require('mongoose')
const {encrypt} = require('../helpers/encrypt')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    email : { 
        type : String,
        lowercase : true,
        required: 'email required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique : true
    },
    password : String,
    profilePicture : {
        type :String,
        default : 'https://storage.googleapis.com/mini-wp-storage-multer/1550383407423gender-neutral-user.png'
    },
    postings : [{ type: Schema.Types.ObjectId, ref: 'Posting' }]
},{ timestamps : true})

userSchema.pre("save",function(next) {
    var self = this;
        User.findOne({email : self.email},function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
            console.log(results);
            let err = 'email has already user'
             //there was a result found, so the email address exists
            // self.invalidate("email","email must be unique");
            next(err);
        } 
    });
    next();
});


userSchema.pre('save', function (next) {
    try {
        var user = this;
        if (!user.isModified('password')) return next();
        encrypt(user, function (err, hash) {
            if (err) {
                next(err)
            } else {
                user.password = hash;
                next();
            }
        })
    } catch (err) {
        next(err)
        console.log(err);

    }

});

const User = mongoose.model('User', userSchema)
module.exports = User