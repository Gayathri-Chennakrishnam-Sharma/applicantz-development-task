const { employee } = require('../models');
const Response = require('../../utils/response');
const EmployeeService = require('../service');

class EmployeeController {
    signupEmployee = async (req, res) => {
        try {
          await EmployeeService.addEmployee(req.body, res);
        } catch (error) {
          res.status(500).send(Response.error(error, 500, "signupEmployeeController"))
        }
      };
    
      getAllEmployee = async (req, res) => {
        try {
          await EmployeeService.getAllEmployee(req.body, res);
        } catch (error) {
          res.status(500).send(Response.error(error, 500, "getAllEmployeeController"))
        }
      };
    
      updateEmployee = async (req, res) => {
        try {
          await EmployeeService.updateEmployee(req.body, res);
        } catch (error) {
          res.status(500).send(Response.error(error, 500, "updateEmployeeController"))
        }
      };
    
      deleteEmployee = async (req, res) => {
        try {
          await EmployeeService.deleteEmployee(req.body, res);
        } catch (error) {
          res.status(500).send(Response.error(error, 500, "deleteEmployeeController"))
        }
      };
    
};

module.exports = new EmployeeController();