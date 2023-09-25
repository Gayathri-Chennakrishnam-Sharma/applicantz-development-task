const { employee } = require("../models/employee");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Response = require('../../utils/response');
const JWT = require('../../utils/generateJwtToken');

class EmployeeService {

  signupEmployee = async (data, res) => {
    try {
      let isAvailable = await employee.findOne({
        where: { employee_id: data.employee_id }
      });
      if (!isAvailable) {
        let employeeData = await employee.create({ ...data });

        if (employeeData) {
          res.status(200).send(Response.success("Employee added successfully!!!", 200, otpSent));
          // res.status(200).send(Response.success("OTP sent to your number, please verify OTP and confirm for a booking!", 200));
        }
      } else {
        res.status(409).send(Response.error("This Employee is already registered, please login!", 409, "employeeSignupService"));
      }
    } catch (error) {
      res.status(500).send(Response.error(error.message, 500, "employeeSignupService"))
    }
  };

  getAllEmployee = async (req, res) => {
    try {
      const data = req.body

      let employeesFound = await employee.find({
        where:{employee_id: data.employee_id}, returning: ['full_name', 'employee_id'], plain:true
      })
      if(employeesFound){
        return res.status(200).send(Response.success('Employees list found!', 200, employeesFound))
      } else {
        return res.status(404).send(Response.success('Employees list not found', 404, 'getAllEmployeeService'))
      }
    } catch (error) {
      return res.status(500).send(Response.error(error.message, 500, 'Error while getAllEmployee'))
    }
  };

  updateEmployee = async (body, res) => {
    try {
      let data = await employee.findOne({
        where: {
          employeeId: body.employee_id
        },
        attributes: ['employee_id', 'profile_photo', 'first_name', 'last_name', 'full_name', 'phone_number', 'country_code', 'gender', 'date_of_birth',  'country', 'state', 'address', 'language_preference'],
      });

      if (data) {
        if (data.profile_photo) {
          data.profile_photo = await S3Util.getUploadImage(data["profile_photo"])
        } else {
          data.profile_photo = null
        }

        return res.status(200).send(Response.success("Profile details fetched successfully!", 200, updatedData));
        }
      return res.status(404).send(Response.error('user not found,no profile details', 404, "profileDetailsService"));

    } catch (error) {
      // 
      res.status(500).send(Response.error(error.message, 500, "profileDetailsService"));
    }
  }

  deleteEmployee = async (req, res) => {
    try {
      let employeeFound = await employee.findOne({
        where: {
          employee_id: req.employee_id}, return: true, 
      })


      if (employeeFound) {
        await employee.findByIdAndDelete(id);
        res.status(200).send(Response.success("Employee updated sucessfully!!", 200, employeeFound))
      } else {
        res.status(404).send(Response.error("Employee not found", 404, "deleteEmployeeService"))
    }
  } 
        catch (error) {
            res.status(500).send(Response.error(error.message, 500, "deleteEmployeeService"))
        }
  }
}





module.exports = new EmployeeService();