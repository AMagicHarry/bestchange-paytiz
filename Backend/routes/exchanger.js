const router = require('express').Router();
const { getExchangers, getExchanger, deleteExchanger, updateExchanger, createExchanger, getExchangeStat,getUserExchanger } = require('../controllers/exchanger.js');
// const { protect } = require('../middleware/protect.js');

// router.use(protect);

router.route('/')
    .get(getExchangers) 
    .post(createExchanger);

router.route('/stats')
    .get(getExchangeStat);

router.route('/user/:userName')
    .get(getUserExchanger);

router.route('/:id')
    .get(getExchanger)  
    .delete(deleteExchanger) 
    .put(updateExchanger);

module.exports = router;
