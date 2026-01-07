import jwt from "jsonwebtoken"
import { JWT_SECRET } from "..";

export default function(req, res, next){
    const token = req.headers.authorization;
    const words = token.split(' ');
    const jwtToken = words[1];

    const decoded = jwt.verify(jwtToken, JWT_SECRET);

    if(decoded.username){
        req.username = decoded.username;
        next();
    }
    else{
        res.status(403).json({
            msg: "User doesn't exists"
        });
    }
};