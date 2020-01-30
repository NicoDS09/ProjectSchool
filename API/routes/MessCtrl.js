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

}