const express = require('express');
const cors = require('cors');
const dontEnv = require('dotenv');
const bodyParser = require('body-parser');
const route = require('./routers');
const app = express();

const port = 4000;
// set up sever
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);

// set route
route(app);
app.listen(port, () => {
    console.log('server is runing.....');
});
