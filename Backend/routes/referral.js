const router = require('express').Router();
const { getReferrals, getReferral, deleteReferral, updateReferral, addReferral } = require('../controllers/referral.js');
// const { protect } = require('../middleware/protect.js');

// router.use(protect);

router.route('/')
    .get(getReferrals)
    .post(addReferral); 

router.route('/:id')
    .get(getReferral)   
    .delete(deleteReferral)  
    .put(updateReferral); 

module.exports = router;
