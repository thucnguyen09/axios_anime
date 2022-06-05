const siteRoute = require('./site');
function router(app) {
    app.use('/v1', siteRoute);
}
module.exports = router;
