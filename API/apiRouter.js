// Imports
var express = require('express');
var UserCtrl = require('./routes/UserCtrl');


exports.router = (function () {
    var apiRouter = express.Router();

    apiRouter.route('/User/').get(UserCtrl.getUser);
    apiRouter.route('/User/new/').post(UserCtrl.postUser);

    return apiRouter;
})();