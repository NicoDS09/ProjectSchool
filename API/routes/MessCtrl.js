var models = require('../models');
var server = require('../server');

module.exports = {

    getMess: function (req, res) {
        var idUser = req.params.idUser;
        models.PostM.findAll({
            attributes: ['id', 'iduser', 'sujet', 'post', 'createdAt', 'updatedAt'],
            where: {
                idUser: idUser,
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

    getAllMess: function (req, res) {
        models.PostM.findAll({
            attributes: ['id', 'iduser', 'sujet', 'post', 'createdAt', 'updatedAt'],
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
        var idUser = req.body.idUser;
        var sujet = req.body.sujet;
        var post = req.body.post;


        if (idUser == null || post == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        var newPost = models.PostM.create({
            idUser: idUser,
            sujet: sujet,
            post: post,

        })
            .then(function (newPost) {
                server.callmessage();
                return res.status(201).json({
                    'id': newPost.id,
                    'idUser': newPost.idUser,
                    'sujet': newPost.sujet,
                    'post': newPost.post,
                })
            })
            .catch(function (err) {
                console.log(err)
                return res.status(500).json({ 'error': `${err}` });
            });
    },


    UpdateMess: function (req, res) {
        var id = req.params.id;
        var post = req.body.post;
        var sujet = req.body.sujet;
        var updatedAt = Date.now();
        if (id == null | post == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.PostM.findOne({
            attributes: ['id'],
            where: { id: id }
        })
            .then(function (Messfound) {
                if (Messfound) {
                    Messfound.update({
                        post: post,
                        sujet: sujet,
                        updatedAt: updatedAt,
                    })

                        .then(function () {
                            return res.status(201).json({
                                'id': id,
                                'post': post,
                                'updatedAt': updatedAt,

                            })
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': `${err}` });
                        });

                } else {
                    return res.status(409).json({ 'error': 'Post not exist' });
                }
            })
    },

    deleteMess: function (req, res) {
        var id = req.params.id;

        if (id == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.PostM.destroy({
            where: {
                id: id,
            }
        })
            .then(function (postfound) {
                if (postfound) {
                    return res.status(201).json({ 'post': `${id} deleted` });
                }
                else {
                    return res.status(404).json({ 'error': `post avec ${id}  n'existe pas` });
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': `${err}` });
            });
    }

}