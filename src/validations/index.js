const Joi = require('joi');
const Response = require('../../utils/response');

class DriverValidation {

    validateSignupEmployee = async (req, res, next) => {
        const validateSignupEmployee = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            department: Joi.string(),
            position: Joi.string()
        })
        try {
            const { error, value } = validateSignupEmployee.validate(req.body);
            if (error) {
                res.status(400).send(Response.error(error.message, 400, "Key type error!"));
                return
            } else {
                next();
            }
        } catch (error) {
            res.status(400).send(Response.error(error.message, 400, 'signupEmployeeValidation'));
        }
    }

    validateUpdateEmployee = async (req, res, next) => {
        const
        validateUpdateEmployee = Joi.object({
                employeeId: Joi.string().required(),
            }).required()

        await validateUpdateEmployee
            .validateAsync(req.body)
            .then((result) => next())
            .catch((error) => { return res.status(400).send(Response.error(error.message, 400, "updateEmployeeValidation")) });
    }

    validateDeleteEmployee = async (req, res, next) => {
        const validateDeleteEmployee = Joi.object({
            employeeId: Joi.string().required(),
        }).required()

        await validateDeleteEmployee
            .validateAsync(req.body)
            .then((result) => next())
            .catch((error) => { return res.status(400).send(Response.error(error.message, 400, "deleteEmployeeValidation")) });
    }
}

module.exports = new DriverValidation();