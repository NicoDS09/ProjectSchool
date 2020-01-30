// Imports
var express = require('express');
var UserCtrl = require('./routes/UserCtrl');
var MessCtrl = require('./routes/MessCtrl');

exports.router = (function () {
    var apiRouter = express.Router();

    //User routes
    apiRouter.route('/User/').get(UserCtrl.getUser);
    apiRouter.route('/User/new/').post(UserCtrl.postUser);

    //PostMessage route 
    apiRouter.route('/Postm/:id').get(MessCtrl.getMess);

    return apiRouter;
})();