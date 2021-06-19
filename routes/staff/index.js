const router = require('express').Router();

const staffController = require('../../controllers/staffController');

/* user route code */
router.post('/',  staffController.addStaff);
router.get('/',  staffController.getStaffs);
router.get('/:staff_id',  staffController.getSingleStaff);
router.put('/:id',  staffController.updateStaff);
module.exports = router;
