const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const tagSchema = new Schema({
    name : String,
    posting : { type: Schema.Types.ObjectId, ref: 'Posting' }
})


const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag