// Imports
var express = require('express');
var UserCtrl = require('./routes/UserCtrl');
var MessCtrl = require('./routes/MessCtrl');
var CommCtrl = require('./routes/CommCtrl');
exports.router = (function () {
    var apiRouter = express.Router();

    //User routes
    apiRouter.route('/User/').get(UserCtrl.getUser);
    apiRouter.route('/User/new/').post(UserCtrl.postUser);
    apiRouter.route('/User/update/:id/').put(UserCtrl.UpdateUser);

    //PostMessage route 
    apiRouter.route('/Postm/:id').get(MessCtrl.getMess);
    apiRouter.route('/Postm/new/').post(MessCtrl.postMess);

    //Commentaire route
    apiRouter.route('/commentaire/:idpost').get(CommCtrl.getCom);
    apiRouter.route('/commentaire/').post(CommCtrl.postCom);
    //   apiRouter.route('/commentaire/').post(MessCtrl.postMess);

    return apiRouter;
})();