// var dependency = require('dependency');
var fs = require('fs');

module.exports = function (app, passport, logger, authorization)
{
    app.get('/', function (req, res)
    {
        var data = null;
        fs.readFile('./database/imagetranslator.json', 'ascii', function (err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }

            data = JSON.parse(data);
            res.send('<HTML><IMG src="' + data[req.query.name] + '"></HTML>\n');
        });
    });

    app.get('*', function (req, res)
    {
        res.send('NOT ENOUGH MINERALS\n');
    });
};