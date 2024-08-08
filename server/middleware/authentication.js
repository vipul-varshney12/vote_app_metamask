const jwt = require('jsonwebtoken')

const authentication = (req,res,next)=>{
    const token  = req.headers['x-access-token']
    if(!token) return res.status(500).json({error:"Authentication Failed!!!"})
    try {
       const decoded = jwt.verify(token,'secretkey')
       req.accountAddress = decoded.accountAddress
       next()
    } catch (error) {
        return res.status(500).json({error:"Authentication Failed!!!"})
    }

}
module.exports={authentication}