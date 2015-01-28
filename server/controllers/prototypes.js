// var dependency = require('dependency');

exports.cardDrag = function(req, res, next)
{
    res.render('prototypes/carddrag', {
        title: 'Hearthstone card drag prototype'
    });
};

exports.cardSearch = function(req, res, next)
{
    res.render('prototypes/cardsearch', {
        title: 'Hearthstone card search prototype'
    });
};
