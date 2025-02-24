import jwt from 'jsonwebtoken';
const JWT_SECRET = 'katisthegod'; 

const fetchuser = (req, res, next) => {
    try
    {
        const token = req.header('auth-token')
        if(!token)
            return res.status(401).json({error: 'Please authenticate using a valid token.'});

        var data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        next();
    }
    catch(err)
    {
        res.status(401).json({error: 'Please authenticate using a valid token.', message: err.message});
        console.log(err);
    }

}

export default fetchuser;
