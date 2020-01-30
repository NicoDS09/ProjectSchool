var models = require('../models');
var bcrypt = require('bcrypt');


module.exports = {
    getUser: function (req, res) {

        models.User.findAll({
            attributes: ['id', 'prenom', 'nom', 'email', 'nomBlogeur', 'createdAt', 'updatedAt'],
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
                    bcrypt.hash(password, 5, function (err, bcryptPassword) {
                        done(null, Userfound, bcryptPassword)
                    });
                    var newUser = models.User.create({
                        prenom: prenom,
                        nom: nom,
                        email: email,
                        password: password,
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

        if (id == null | prenom == null | nom == null | email == null | password == null | nomBlogeur == null) {
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
                    })

                        .then(function (newUser) {
                            return res.status(201).json({
                                'prenom': prenom + '' + ' Updated',
                                'nom': nom + '' + ' Updated',
                                'email': email + '' + ' Updated',
                                'password': password + '' + ' Updated',
                                'nomBlogeur': nomBlogeur + '' + ' Updated',

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