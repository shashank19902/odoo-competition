const jwt = require("jsonwebtoken");
const User = require('../models/register');

const Authenticate = async (req,res,next) => {
    try {
        const role = req.cookies.role;
        if(role === 'Student' || role === 'Faculty' || role === 'HOD' || role === 'Principal'){
            try {
                const token = req.cookies.jwtoken;
                const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        
                const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});
                if(!rootUser){
                    throw new Error('User not Found');
                }else{
                    req.token = token;
                    req.rootUser = rootUser;
                    req.userId = rootUser._id;
                    // headers sent here, can't send from other again error
                    // res.status(200).json({message: "Authenticated"})
                    next();
                }
            } catch (error) {
                console.log(error);
            }
        }
        else{
            res.status(401).json({
                message: "Not Authorized"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = Authenticate;