// var dependency = require('dependency');

exports.editor = function(req, res, next)
{
    res.render('hearthstone/deck-editor', {
        title: 'BSF - Hearthstone deck editor'
    });
};
