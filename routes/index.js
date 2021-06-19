let router = require('express').Router();
const v1ApiRoutes = require('./v1-routes');


router.get('/', function (req, res) {
    res.json({
        status: 'Base version API test, welcome',
        message: "Versions of this application"
    });
});

router.use('/v1', v1ApiRoutes);

module.exports = router;
