var cfg        = require('./config'),
    express    = require('express'),
    compress   = require('compression'),
    fs         = require('fs'),
    handlebars = require('handlebars'),
    profile    = require('./profile'),
    app        = express();

// Use gzip compression
app.use(compress());


// serve static files
app.use('/assets', express.static(__dirname + '/assets'));


// json spaces
app.set('json spaces', 4);


// handle home page
app.get('/', function (req, res) {

    if (req.query.format === 'json') {
        res.jsonp(profile);
    } else {
        fs.readFile('index.html', 'utf-8', function(err, data) {
            if (err) {
                // Handle Error here
            } else {
                var tmpl = handlebars.compile(data);
                res.send(tmpl(profile));
            }
        });
    }
});


// handle 404
app.use(function (req, res) {
    fs.readFile('404.html', 'utf-8', function(err, data) {
        if (err) {
            // Handle Error here
        } else {
            var tmpl = handlebars.compile(data);
            res.status(404);
            res.send(tmpl());
        }
    });
});


app.listen(cfg.port);
console.log('Listening on port:', cfg.port);
