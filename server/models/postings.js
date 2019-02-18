const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postingSchema = new Schema({
    author :{ type: Schema.Types.ObjectId, ref: 'User' },
    title : String,
    posting : String,
    image : String,
    tags : [String]
},{ timestamps : true})

const Posting = mongoose.model('Posting', postingSchema)

module.exports = Posting