var models = require('../models');


module.exports = {

    getCom: function (req, res) {
        var idpost = req.params.idpost;
        models.commentaire.findAll({
            attributes: ['id', 'idpost', 'comm', 'createdAt', 'updatedAt'],
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

    // postMess: function (req, res) {
    //     var id = req.body.id;
    //     var idUser = req.body.idUser;
    //     var post = req.body.post;


    //     if (id == null || idUser == null || post == null) {
    //         return res.status(400).json({ 'error': 'missing parameters' });
    //     }
    //     models.PostM.findOne({
    //         attributes: ['id'],
    //         where: { id: id }
    //     })
    //         .then(function (Postfound) {
    //             if (!Postfound) {
    //                 var newPost = models.PostM.create({
    //                     id: id,
    //                     idUser: idUser,
    //                     post: post,
    //                 })
    //                     .then(function (newPost) {
    //                         return res.status(201).json({
    //                             'id': newPost.id,
    //                             'idUser': newPost.idUser,
    //                             'post': newPost.post,
    //                         })
    //                     })
    //                     .catch(function (err) {
    //                         console.log(err)
    //                         return res.status(500).json({ 'error': `${err}` });
    //                     });

    //             } else {
    //                 return res.status(409).json({ 'error': 'Post already exist' });
    //             }
    //         })
    // },

}