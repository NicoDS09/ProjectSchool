var models = require('../models');
var server = require('../server');

module.exports = {

    getCom: function (req, res) {
        var idpost = req.params.idpost;
        models.commentaire.findAll({
            attributes: ['id', 'idpost', 'idUser', 'comm', 'createdAt', 'updatedAt'],
            where: {
                idpost: idpost,
            }
        }).then(function (com) {
            if (com) {
                res.status(201).json(com);
            } else {
                res.status(404).json({ 'error': 'com not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': err });
        });
    },

    postCom: function (req, res) {
        var idpost = req.body.idpost;
        var idUser = req.body.idUser
        var comm = req.body.comm;


        if (idpost == null || comm == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        var newPost = models.commentaire.create({
            idpost: idpost,
            idUser: idUser,
            comm: comm,
        })
            .then(function (newPost) {
                server.callcommentaire();
                return res.status(201).json({
                    'id': newPost.id,
                    'idpost': newPost.idpost,
                    'idUser': newPost.idUser,
                    'com': newPost.comm,
                    'createat': newPost.createdAt,
                    'updateat': newPost.updatedAt,
                })
            })
            .catch(function (err) {
                console.log(err)
                return res.status(500).json({ 'error': `${err}` });
            });


    },



    deleteCom: function (req, res) {
        var id = req.params.id;

        if (id == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.commentaire.destroy({
            where: {
                id: id,
            }
        })
            .then(function (comfound) {
                if (comfound) {
                    return res.status(201).json({ 'Com': `${id} deleted` });
                }
                else {
                    return res.status(404).json({ 'error': `commentaire avec ${id}  n'existe pas` });
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': `${err}` });
            });
    }
}