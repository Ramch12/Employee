const express = require('express');
const router = express.Router();
const {get_page}=require('../controller/employee');
const {create_emp}=require('../controller/employee');
const {get_emp}=require('../controller/employee');
const {update_Emp}=require('../controller/employee');
const {delete_emp}=require('../controller/employee');



router
    .route('/create')
    .post(create_emp);

router
    .route('/get/:id')
    .get(get_emp);

router
    .route('/update/:id')
    .put(update_Emp);

router
    .route('/delete/:id')
    .delete(delete_emp);

router
    .route('/get_page')
    .get(get_page);


module.exports = router