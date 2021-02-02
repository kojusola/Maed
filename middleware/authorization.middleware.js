const { verifyAccessToken } = require('../createVerifytoken');


 const verifyToken = async function (req,res,next){
     const { authorization } = req.headers;
    const decoded = await verifyAccessToken(authorization);
    if(decoded.email){
    const userId = await decoded.users
    req.userId = await userId
    return  next();
     }
return res.status(403).json({message:"Forbidden"})
}

module.exports={
    verifyToken
}