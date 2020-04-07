// Imports
var express = require('express');
var UserCtrl = require('./routes/UserCtrl');
var MessCtrl = require('./routes/MessCtrl');
var CommCtrl = require('./routes/CommCtrl');
var Planets = require('./routes/planets');


exports.router = (function () {
    var apiRouter = express.Router();

    //Planets routes
    apiRouter.route('/planet/:id').get(Planets.getPlanets);


    //User routes
    apiRouter.route('/userComm/:idPost').get(UserCtrl.getCommUser);
    apiRouter.route('/userMessage/').get(UserCtrl.getMessagePost);
    apiRouter.route('/user/token/').get(UserCtrl.verifyToken);
    apiRouter.route('/user/').get(UserCtrl.getUser);
    apiRouter.route('/user/:id').get(UserCtrl.getUserById);
    apiRouter.route('/user/').post(UserCtrl.postUser);
    apiRouter.route('/user/login').post(UserCtrl.login);
    apiRouter.route('/user/:id/').put(UserCtrl.UpdateUser);

    //PostMessage route 
    apiRouter.route('/pic/').get(MessCtrl.testPic);
    apiRouter.route('/postmSujet/').post(MessCtrl.getMessBySubject);
    apiRouter.route('/postm/:id').get(MessCtrl.getMess);
    apiRouter.route('/postm/:id').put(MessCtrl.UpdateMess);
    apiRouter.route('/postm/:id').delete(MessCtrl.deleteMess);
    apiRouter.route('/postm/').post(MessCtrl.postMess);

    //Commentaire route
    apiRouter.route('/commentaire/:idpost').get(CommCtrl.getCom);
    apiRouter.route('/commentaire/:id').delete(CommCtrl.deleteCom);
    apiRouter.route('/commentaire/').post(CommCtrl.postCom);


    return apiRouter;
})();