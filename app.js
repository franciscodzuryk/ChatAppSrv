var express = require('express'),
    https = require('https'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    ip = require("ip");

var PORT = process.env.PORT || 8443;
var HOST = process.env.HOST || '';

var app = express();

app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static('public'));
app.use(errorHandler({ dumpExceptions: true, showStack: true }));


//Load Model
var user = require("./Controllers/User");
var company = require("./Controllers/Company");

//REST Routes
app.post('/user/login', user.login);
app.post('/user/:id_user/login', user.relogin);
app.post('/user/:id_user/logout', user.logout);
app.get('/user/', user.userList);
app.get('/user/status', user.status);
app.post('/user/:id_user/message', user.sendMessage);
app.get('/user/:id_user/message', user.getMessages);
app.post('/company/login', company.login);
app.post('/company/logout', company.logout);
app.get('/company/status', company.status);
app.post('/company/message', company.sendMessage);
app.get('/company/message', company.getAllMessages);
app.get('/company/message/user/:id_user', company.getMessages);


var options = {
    key  : fs.readFileSync('ssl/rootCA.key'),
    passphrase: 'fran',
    cert : fs.readFileSync('ssl/rootCA.crt')
}

if (process.argv[2] == 'https') {
    https.createServer(options, app).listen(PORT, HOST, null, function() {
        console.log("Node server running on https://" + ip.address() + ":"+PORT);
    });
} else {
    app.listen(PORT, function() {  
      console.log("Node server running on http://" + ip.address() + ":"+PORT);
    });
}

