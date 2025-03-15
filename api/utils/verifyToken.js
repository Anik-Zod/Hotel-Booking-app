import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token;
    
    console.log("Incoming Token:", token); // Debugging line

    if (!token) {
        console.log("❌ No token found!");
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("❌ Token verification failed!");
            return next(createError(403, "Your token is not valid"));
        }

        console.log("✅ Verified token:", user);
        req.user = user;
        next();
    });
};


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            console.log("Verified user");
            next();
        } else {
            return next(createError(403, "You are not authenticated"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.isAdmin) {
            console.log("Verified Admin");
            next();
        } else {
            return next(createError(403, "You are not authorized"));
        }
    });
};
