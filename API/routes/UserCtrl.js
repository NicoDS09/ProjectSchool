var models = require('../models');
const Cryptr = require('cryptr');
const jwt = require('jsonwebtoken');
const cryptr = new Cryptr('myTotalySecretKey');
var mysql = require('mysql');



const secretKey = 'secretKey';
var con = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "astro"
});


module.exports = {


    getMessagePost: function (req, res) {

        con.query("SELECT prenom, nom, nomBlogeur, email,sujet,post, PostMs.updatedAt FROM Users INNER JOIN PostMs ON Users.id = PostMs.idUser ORDER BY PostMs.updatedAt DESC", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.status(201).json(result);
        });
    },

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


    getUser: function (req, res) {

        models.User.findAll({
            attributes: ['id', 'prenom', 'nom', 'email', 'nomBlogeur', 'createdAt', 'updatedAt'],
        }).then(function (user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'users not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': err });
        });
    },

    getUserById: function (req, res) {
        var id = req.params.id;
        models.User.findOne({
            attributes: ['id', 'prenom', 'nom', 'email', 'nomBlogeur', 'createdAt', 'updatedAt'],
            where: { id: id }
        }).then(function (user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': err });
        });
    },

    login: function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.User.findOne({
            where: { email: email }
        }).then(function (Userfound) {
            if (Userfound) {
                console.log(cryptr.decrypt(Userfound.password));
                if (cryptr.decrypt(Userfound.password) === password) {
                    let payload = { subject: Userfound.id }
                    let token = jwt.sign(payload, secretKey)
                    res.status(200).json({
                        token, 'User': {
                            'id': Userfound.id,
                            'prenom': Userfound.prenom,
                            'nom': Userfound.nom,
                            'email': Userfound.email,
                            'nomBlogeur': Userfound.nomBlogeur,
                        }
                    });
                } else {
                    res.status(401).json({ 'error': 'Invalid password' });
                }
            } else {
                res.status(401).json({ 'error': 'Invalid email' });
            }
        }).catch(function (error) {
            return res.status(500).json({ 'error': `${error}` });
        })
    },

    verifyToken: function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({ 'error': 'Requête non autorisé' });
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === "") {
            return res.status(401).json({ 'error': 'Requête non autorisé' });
        }
        try {
            let payload = jwt.verify(token, secretKey);
            if (!payload) {
                return res.status(401).json({ 'error': 'Requête non autorisé' });
            }
            req.userId = payload.subject;
            return res.status(200).json(true);

        } catch (err) {
            return res.status(401).json({ 'error': 'Requête non autorisé' });
        }
    },

    postUser: function (req, res) {
        var prenom = req.body.prenom;
        var nom = req.body.nom;
        var email = req.body.email;
        var password = req.body.password;
        var nomBlogeur = req.body.nomBlogeur;

        if (prenom == null || nom == null || email == null || password == null || nomBlogeur == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(function (Userfound) {
                if (!Userfound) {
                    const encryptedString = cryptr.encrypt(password);
                    var newUser = models.User.create({
                        prenom: prenom,
                        nom: nom,
                        email: email,
                        password: encryptedString,
                        nomBlogeur: nomBlogeur,
                    })
                        .then(function (newUser) {
                            return res.status(201).json({
                                'id': newUser.id,
                                'prenom': newUser.prenom,
                                'nom': newUser.nom,
                                'email': newUser.email,
                                'nomBlogeur': newUser.nomBlogeur,
                                'createdAt': newUser.createdAt,
                                'updatedAt': newUser.updatedAt,
                            })
                        })
                        .catch(function (err) {
                            console.log(err)
                            return res.status(500).json({ 'error': `${err}` });
                        });

                } else {
                    return res.status(409).json({ 'error': 'User already exist' });
                }
            })
    },

    UpdateUser: function (req, res) {

        var id = req.params.id;
        var prenom = req.body.prenom;
        var nom = req.body.nom;
        var email = req.body.email;
        var password = req.body.password;
        var nomBlogeur = req.body.nomBlogeur;
        var updatedAt = Date.now();
        if (prenom == null | nom == null | email == null | password == null | nomBlogeur == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.User.findOne({
            attributes: ['id'],
            where: { id: id }
        })
            .then(function (Userfound) {
                if (Userfound) {
                    Userfound.update({
                        prenom: prenom,
                        nom: nom,
                        email: email,
                        password: password,
                        nomBlogeur: nomBlogeur,
                        updatedAt: Date.now(),
                    })

                        .then(function () {
                            return res.status(201).json({
                                'prenom': prenom,
                                'nom': nom,
                                'email': email,
                                'password': password,
                                'nomBlogeur': nomBlogeur,
                                'updatedAt': updatedAt,
                            })
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': `${err}` });
                        });

                } else {
                    return res.status(409).json({ 'error': 'User not exist' });
                }
            })
    },




}