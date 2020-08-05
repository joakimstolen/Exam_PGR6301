const {app} = require('./app');
const items = require('./db/items')

const port = process.env.PORT || 8080;

app.listen(port, () => {
    items.initWithItems()
    console.log('Started server on port ' + port);
});