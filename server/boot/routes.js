// var dependency = require('dependency');
var fs = require('fs');

module.exports = function (app, passport, logger, authorization)
{
    app.get('/', function (req, res)
    {
        res.send('<HTML><A HREF="/hearthstone/views/cardsearch.html">Card search</A></HTML>\n');
    });

    app.get('*', function (req, res)
    {
        res.send('NOT ENOUGH MINERALS\n');
    });
};
