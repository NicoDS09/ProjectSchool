var models = require('../models');
var server = require('../server');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "astro"
});

module.exports = {

    getMess: function (req, res) {
        var id = req.params.id;

        if (id == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        models.PostM.findAll({
            attributes: ['id', 'iduser', 'sujet', 'post', 'createdAt', 'updatedAt'],
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

    getMessBySubject: function (req, res) {
        var sujet = req.body.sujet

        if (sujet == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        con.query("SELECT PostMs.id, PostMs.idUser, prenom, nom, nomBlogeur, email,sujet,post, PostMs.updatedAt FROM Users INNER JOIN PostMs ON Users.id = PostMs.idUser WHERE PostMs.sujet = '" + sujet + "'   ORDER BY PostMs.updatedAt DESC", function (err, result, fields) {
            if (err) throw err;
            if (result.length != 0) {
                res.status(201).json(result);
            } else {
                res.status(404).json({ 'erro': 'not found' });
            }
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
                            server.callmessage();
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
                    server.callmessage();
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