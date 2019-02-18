
require('dotenv').config()
const Posting = require('../models/postings')

function isAuthor(req,res,next) {
    try {
        console.log( typeof req.params.id,"==========didalama admin===");
        
        // let decoded = jwt.verify(req.headers.token, process.env.JWTTOKEN)
        Posting
            .findOne({ _id : req.params.id })
            .then(project => {
                
                if(project.author == req.user) {
                    next()
                } else {
                    res.status(402).json({message : 'not authorize'})
                }
            })
            .catch(err => {
                console.log(err,"emroor di dalam");
                
                res.status(500).json({ message: 'internal server error', error: err })
            })

    } catch (err) {
        console.log(err,"===========di admin=====");
        
        res.status(402).json({ message: "you're not authorize for this session" })
    }
}

module.exports = isAuthor