const Posting = require('../models/postings')
const Tag = require('../models/tag')
const User = require('../models/users')

class postingController {
    static create(req, res) {
        let postToUser = ''
        let data = JSON.parse(req.body.data)
        console.log(data.tags);

        Posting
            .create({
                title: data.title,
                posting: data.posting,
                image: req.file.cloudStoragePublicUrl,
                author: req.user,
                tags: data.tags
            })
            .then(post => {
                postToUser = post
                let input = []
                data.tags.forEach(tag => {
                    let obj = {}
                    obj.name = tag
                    obj.posting = post._id
                    input.push(obj)
                })

                return Tag
                    .create(input)
                    .then(data => {
                        return User
                            .findOneAndUpdate({
                                _id: req.user
                            }, { $push: { postings: postToUser } } ,
                                { new: true })
                            .then(user => {

                                res.status(201).json({ user: user })
                            })

                    })

            })
            .catch(err => {
                console.log(err);

                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        Posting
            .find({})
            .populate('author')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let data = JSON.parse(req.body.data)
        console.log(data, "===================");

        if (req.file) {
            data.image = req.file.cloudStoragePublicUrl
        }
        Posting
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $set:
                    {
                        title: data.title,
                        posting: data.posting,
                        image: data.image

                    }
                }, {
                    new: true
                })
            .then(data => {
                console.log(data);

                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);

                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Posting
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).json({ message: 'data deleted' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findByAuthor(req, res) {
        User
            .find({
                _id: req.user
            })
            .populate('postings')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = postingController