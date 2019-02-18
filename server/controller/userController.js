const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static create(req, res) {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(data => {
                console.log(data);

                res.status(201).json(data)
            })
            .catch(err => {
                if(err.errmsg) {
                    res.status(404).json({error : 'email has already used'})
                } else if (err.errors) {

                res.status(404).json({error : 'field name cannot be blank'})
                    // error = err.errors
                }

                // console.log(error);
                

            })
    }

    static findOne(req, res) {
        let user = ''
    
        User
            .findOne({
                email: req.body.email
            })
            .then(userLogin => {
                if (userLogin) {
                    user = userLogin
                    // console.log(user);
                    return bcrypt.compare(req.body.password, user.password)
                        .then(response=> {
                            if(response) {
                                res.status(200).json({
                                    user : user,
                                    data: jwt.sign({
                                        id : user._id,
                                        email: user.email
                                    }, process.env.JWTTOKEN)
                                })
                            } else {
                                res.status(404).json({ error: 'password wrong' })
                            }
                            
                        })
                  
                } else {
                    res.status(404).json({ error: 'email wrong' })
                }
            })
            .catch(err => {
                
                res.status(500).json({ error: err })
            })
    }

    static update (req,res) {

        let data = JSON.parse(req.body.data)
        let image = data.image
        if(req.file) {
            image = req.file.cloudStoragePublicUrl
        }
        User
            .findOneAndUpdate({
                _id: req.user
            }, {
                $set : {
                    name : data.name,
                    profilePicture : image,
                    email : data.email
                }
            }, {new :true})
            .then(data => {
                console.log(data);
                
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json(err)
            })
    }
}


module.exports = UserController