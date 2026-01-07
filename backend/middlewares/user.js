import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";


export default function userMiddleware(req, res, next) {
    if (req.method === "OPTIONS") return next();
    console.log("HEADERS:", req.headers);
    const authHeader =  req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
        return res.status(403).json({
            msg: "Authorization header missing"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(403).json({
            msg: "Invalid authorization format"
        });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid or expired token"
        });
    }
}
