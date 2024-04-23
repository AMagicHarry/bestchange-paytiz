const router = require('express').Router();
const { getUsers, getUser, deleteUser, updateUser, addUser } = require('../controllers/user.js');
// const { protect } = require('../middleware/protect.js');

// router.use(protect);

router.route('/')
    .get(getUsers) 
    .post(addUser); 

router.route('/:id')
    .get(getUser)   
    .delete(deleteUser)  
    .put(updateUser);  

module.exports = router;