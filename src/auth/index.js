const { employee } = require('../models/employee');
const Response = require('../../utils/response');
const jwt = require('jsonwebtoken');
const jwtSec = process.env.JWT_SECRET_KEY;
class EmployeeAuth {
    auth = async (req, res, next) => {
        try {
            let authDataMessage;
            let userFound;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) {
                // No token provided
                authDataMessage = 'Invalid Login/Signup!';
                return res.status(500).send(Response.error(authDataMessage, 500, "authEmployeeMiddleware"));
            }
            jwt.verify(token, jwtSec, (err, user) => {
                if (err) {
                    // Invalid token
                    return authDataMessage = 'Please login/signup to access';
                }
                userFound = user;
            });
            if (userFound) {
                req.user = userFound;
                let body = { ...userFound };

                let phoneNumber = body.phone_number;

                let userDetails = await employee.findOne({
                    where: { phone_number: phoneNumber, jwt_token: token }
                })
                if (userDetails) {
                    req.body.phone_number = userDetails.phone_number;
                    req.body.updated_at = userDetails.updated_at;
                    next();
                } else {
                    authDataMessage = 'Invalid Login/Signup!';
                    return res.status(401).send(Response.error(authDataMessage, 401, "user not matched authEmployeeMiddleware"));
                }
            }
            else {
                authDataMessage = 'Invalid Login/Signup!';
                return res.status(401).send(Response.error(authDataMessage, 401, "Invalid Token/Token expired authEmployeeMiddleware"));
            }
        }
        catch (error) {
            res.status(500).send(Response.error(error.message, 500, "Employee authMiddleware"))
        }
    }

    authLogout = async (req, res, next) => {
        try {
            let authDataMessage;
            let userFound;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) {
                // No token provided
                authDataMessage = 'Invalid Login/Signup!';
                return res.status(500).send(Response.error(authDataMessage, 500, "authEmployeeMiddleware"));
            }
            jwt.verify(token, jwtSec, (err, user) => {
                if (err) {
                    // Invalid token
                    return authDataMessage = 'Please login/signup to access';
                }
                userFound = user;
            });
            if (userFound) {
                req.user = userFound;
                let body = { ...userFound };
                let phoneNumber = body.phone_number;
                let userDetails = await driver.findOne({
                    where: { phone_number: phoneNumber }
                })
                req.body.phone_number = userDetails.phone_number;
                req.body.employeeId = userDetails.employee_id;
                req.body.token = token;

                next();
            }
            else {
                return res.status(500).send(Response.error(authDataMessage, 500, "JWT authEmployeeMiddleware"));
            }
        }
        catch (error) {
            // 
            res.status(500).send(Response.error(error, 500, "Employee authEmployeeMiddleware"))
        }
    }

}

module.exports = new EmployeeAuth();