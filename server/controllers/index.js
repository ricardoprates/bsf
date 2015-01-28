// var dependency = require('dependency');

exports.home = function(req, res, next)
{
    res.render('home', {
        title: 'BSF - Best served free'
    });
};

exports.notFound = function (req, res, next)
{
    res.send(404, 'NOT ENOUGH MINERALS\n');
};
