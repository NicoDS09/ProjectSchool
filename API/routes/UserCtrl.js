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

    UpdateUetdepartement: function (req, res) {
        var headerAuth = req.headers['x-api-key'];
        var TestToken = jwtUtils.verifToken(headerAuth);
        if (TestToken < 0)
            return res.status(400).json({ 'error': 'wrong token' });

        var id = req.params.id;
        var idDep = req.params.idDep;
        var IP_Bright = req.params.IP_Bright;
        var newIp = req.body.newIp;
        var localisation = req.body.localisation;
        var ProjectName = req.body.ProjectName;

        if (IP_Bright == null | localisation == null | ProjectName == null | newIp == null | id == null | idDep == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.UetData.findOne({
            attributes: ['IP_Bright',],
            where: { IP_Bright: newIp }
        })
            .then(function (existip) {
                if (!existip) {
                    models.UetData.findOne({
                        attributes: ['IP_Bright', 'id', 'idDep'],
                        where: { IP_Bright: IP_Bright, id: id, idDep: idDep }
                    })
                        .then(function (Depfound) {
                            if (Depfound) {
                                Depfound.update({
                                    IP_Bright: newIp,
                                    localisation: localisation,
                                    ProjectName: ProjectName,
                                })
                                    .then(function (newDep) {
                                        return res.status(201).json({
                                            'IP_Bright': `new ${newIp}`,
                                            'localisation': `new ${localisation}`,
                                            'ProjectName': `new ${ProjectName}`,
                                        })
                                    })
                                    .catch(function (err) {
                                        return res.status(500).json({ 'error': `${err}` });
                                    });

                            } else {
                                return res.status(409).json({ 'error': `uet not exist` });
                            }
                        })
                } else {
                    return res.status(409).json({ 'error': 'IP already exist' });
                }
            })
    },
}