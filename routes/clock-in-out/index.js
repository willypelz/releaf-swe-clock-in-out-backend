const router = require('express').Router();

const clockInOutController = require('../../controllers/clockInOutController');

/* user route code */
router.post('/',  clockInOutController.clockInOut);
router.get('/',  clockInOutController.clockInOutLogs);
// router.get('/:id',  staffController.getSingleStaff);
// router.patch('/:id',  staffController.updateStaff);
// router.delete('/:id',  staffController.deleteStaff);
module.exports = router;
