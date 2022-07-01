var jwt = require('jsonwebtoken');
const jwt_secret = 'Mithun_Secret'

const fetchuser = (req,res,next) => {
    //get The User from jwt Token and id to request object


    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'Please autheticate with valid token'})
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;

        next()
    } catch (error) {
        res.status(401).send({error: 'Please autheticate with valid token'})
    }
}

module.exports = fetchuser;