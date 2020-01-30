var models = require('../models');


module.exports = {

    getMess: function (req, res) {
        var id = req.params.id;
        models.PostM.findAll({
            attributes: ['id', 'iduser', 'post', 'createdAt', 'updatedAt'],
            where: {
                id: id,
            }
        }).then(function (mess) {
            if (mess) {
                res.status(201).json(mess);
            } else {
                res.status(404).json({ 'error': 'mess not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': err });
        });
    },

    postMess: function (req, res) {
        var id = req.body.id;
        var idUser = req.body.idUser;
        var post = req.body.post;


        if (id == null || idUser == null || post == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.PostM.findOne({
            attributes: ['id'],
            where: { id: id }
        })
            .then(function (Postfound) {
                if (!Postfound) {
                    var newPost = models.PostM.create({
                        id: id,
                        idUser: idUser,
                        post: post,
                    })
                        .then(function (newPost) {
                            return res.status(201).json({
                                'id': newPost.id,
                                'idUser': newPost.idUser,
                                'post': newPost.post,
                            })
                        })
                        .catch(function (err) {
                            console.log(err)
                            return res.status(500).json({ 'error': `${err}` });
                        });

                } else {
                    return res.status(409).json({ 'error': 'Post already exist' });
                }
            })
    },

}