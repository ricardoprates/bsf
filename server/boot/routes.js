// var dependency = require('dependency');

module.exports = function (app, passport, logger, authorization)
{
    var prototypeController = require('../controllers/prototypes');
    var hearthstoneController = require('../controllers/hearthstone');
    var indexController = require('../controllers/index');

    app.get('/hearthstone/prototypes/drag', prototypeController.cardDrag);
    app.get('/hearthstone/prototypes/search', prototypeController.cardSearch);

    app.get('/hearthstone/editor', hearthstoneController.editor);

    app.get('/', indexController.home);
    app.get('*', indexController.notFound);
};
