const Tag = require('../models/tag')


class TagController {
   static allTag(req,res) {
       Tag
            .find({})
            .populate('posting')
            .then(data => {
                res.status(200).json({data : data})
            })
            .catch(err => {
                res.status(500).json({error : err})
            })
   }
}
module.exports = TagController
// tag = new TagController()
