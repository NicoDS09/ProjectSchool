const fetch = require('node-fetch');



module.exports = {
    getPlanets: function (req, result) {
        planet = req.params.id;
        console.log(planet)
        fetch('https://api.le-systeme-solaire.net/rest/bodies/' + planet)
            .then(res => res.json())
            .then(json => result.status(201).json(json));
    },

}

