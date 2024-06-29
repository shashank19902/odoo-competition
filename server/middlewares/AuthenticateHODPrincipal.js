const jwt = require("jsonwebtoken");
const facultyList = require('../models/Addfaculty');

const AuthenticateHODPrincipal = async (req, res, next) => {
    try {
        const role = req.cookies.role;
        if (role === 'HOD' || role === 'Principal') {
            try {
                const token = req.cookies.jwtokenfaculty;
                console.log(role);
                const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
                const rootUser = await facultyList.findOne({ _id: verifyToken._id, "tokens.token": token });
                if (!rootUser) {
                    throw new Error('Faculty not Found');
                } else{
                    res.status(200).json({message: "authenticated"}, req.rootUser = rootUser);
                    next();
                }
            } catch (error) {
                console.log(error);
            }
        }
        else if(role === 'Faculty'){
            res.status(300).json({message: "You have no access as Faculty"});
        } 
        else {
            res.status(401).json({message: "Unauthorized"});
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = AuthenticateHODPrincipal;