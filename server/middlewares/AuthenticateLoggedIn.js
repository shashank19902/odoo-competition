const jwt = require("jsonwebtoken");
const facultyList = require('../models/Addfaculty');

const AuthenticateLoggedIn = async (req, res, next) => {
    try {
        const role = req.cookies.role;
        if (role !== undefined) {
            try {
              res.status(401).json({ message: 'You are logged In' });  
            } catch (error) {
                console.log(error);
            }
        }
        else {
            res.status(200).json({ message: 'Not logged In' });  
            next();
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = AuthenticateLoggedIn;