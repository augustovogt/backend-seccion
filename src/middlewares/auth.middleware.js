const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports= function(req,res,next){
    const token = req.headers["authorization"];
    if(!token){
        const error= new Error();
        error.status = 400,
        error.message = "token must be send";
        throw error;
    }
    jwt.verify(token, JWT_SECRET, function(err, decodeToken){
        if(err){
            const error= new Error();
            error.status = 401,
            error.message = "Invalid token";
            throw error;
        }
        req.user = decodeToken.user;
        next();      
    });
}


