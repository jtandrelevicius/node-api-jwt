import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";



export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken){
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, "c152e7bb-ec71-4918-8275-8aa786206b2a");

        return next();
        
    } catch (err) {
        return response.status(401).json({
            message: "Token invalid"
        })   
    }
}