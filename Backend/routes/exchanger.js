const router = require('express').Router();
const { getExchangers, getExchanger, deleteExchanger, updateExchanger, addExchanger } = require('../controllers/exchanger.js');
// const { protect } = require('../middleware/protect.js');

// router.use(protect);

router.route('/')
    .get(getExchangers) 
    .post(addExchanger);

router.route('/:id')
    .get(getExchanger)  
    .delete(deleteExchanger) 
    .put(updateExchanger);

module.exports = router;
