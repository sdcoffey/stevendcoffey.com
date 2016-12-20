var path = require('path');
var app = require('connect')();

app.use(require('connect-livereload')());
app.use(require('serve-static')(path.join(__dirname, '/build/dev')));

var server = app.listen(3001, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('custom server listening at http://%s:%s', host, port);
});
