// var dependency = require('dependency');

module.exports = function (app, passport, logger, authorization)
{
    var prototypeController = require('../controllers/prototypes');
    var indexController = require('../controllers/index');

    app.get('/hearthstone/prototypes/drag', prototypeController.cardDrag);
    app.get('/hearthstone/prototypes/search', prototypeController.cardSearch);

    app.get('/', indexController.home);
    app.get('*', indexController.notFound);
};
