const jwt = require("jsonwebtoken");
const facultyList = require('../models/Addfaculty');

const AddDBEntry = async (req,res,next) => {
    try {
        const role = req.cookies.role;
        // const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        // const rootUser = await facultyList.findOne({_id: verifyToken._id, "tokens.token": token});
        if(role !== 'Faculty' || role !== 'Principal' || role !== 'HOD' || role === null || role === undefined){
            throw new Error('Unauthorized');
        }else if(role === 'Faculty' || role === 'Principal' || role === 'HOD'){
            req.rootUser = rootUser;
            next();
        }else{
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = AddDBEntry;