const router = require('express').Router();
const v1ApiStaffRoutes = require('./staff');
const v1ApiClockInOutRoutes = require('./clock-in-out');
const v1ApiAuthRoutes = require('./auth');

router.use('/staffs', v1ApiStaffRoutes);
router.use('/auth', v1ApiAuthRoutes);
router.use('/clock-in-out', v1ApiClockInOutRoutes);
module.exports = router;
