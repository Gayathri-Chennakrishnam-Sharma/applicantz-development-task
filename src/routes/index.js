var express = require('express');
var router = express.Router();
const EmployeeController = require('../controller');
const EmployeeValidation = require('../validations');
const EmployeeAuth = require("../auth")

//production standard code
router.post('/add-employee', EmployeeValidation.validateSignupEmployee, EmployeeAuth.auth,  EmployeeController.signupEmployee);
router.get('/', EmployeeAuth.auth, EmployeeController.getAllEmployee);
router.put('/:id', EmployeeValidation.validateUpdateEmployee,EmployeeAuth.auth,  EmployeeController.updateEmployee)
router.delete('/:id', EmployeeValidation.validateDeleteEmployee,EmployeeAuth.auth,  EmployeeController.deleteEmployee);

module.exports = router;
