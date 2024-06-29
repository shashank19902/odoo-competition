const jwt = require("jsonwebtoken");
const facultyList = require('../models/Addfaculty');

const AuthenticateFaculties = async (req, res, next) => {
    try {
        const role = req.cookies.role;
        if (role === 'HOD' || role === 'Principal' || role === 'Faculty') {
            try {
                const token = req.cookies.jwtokenfaculty;
                console.log(role);
                const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
                const rootUser = await facultyList.findOne({ _id: verifyToken._id, "tokens.token": token });
                if (!rootUser) {
                    throw new Error('Faculty not Found');
                } else{
                    req.rootUser = rootUser;
                    // res.status(200).send(req.rootUser);
                    next();
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            res.status(401).json({message: "Unauthorized"});
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = AuthenticateFaculties;