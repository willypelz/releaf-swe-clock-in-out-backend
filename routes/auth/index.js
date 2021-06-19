const router = require('express').Router();
const passport = require('passport');

const staffController = require('../../controllers/authController');

/* user route code */
router.post('/login', passport.authenticate('local', {session: false}),  staffController.login);

module.exports = router;
