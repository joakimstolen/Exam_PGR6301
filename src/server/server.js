//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/server/server.js

const {app} = require('./app');
const items = require('./db/items')

const port = process.env.PORT || 8080;

app.listen(port, () => {
    items.initWithItems()
    console.log('Started server on port ' + port);
});