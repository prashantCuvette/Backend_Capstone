import jwt from "jsonwebtoken"


export const authenticate = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader);

    if(!authHeader || !authHeader.startsWith(`Bearer `)) {
        return res.status(401).json({message: "No Token Provided", success: false})
    };

    //Bearer !$%iuarfherohgoehrifhh84rfr55rfhrfhrek
    // [Bearer, !$%iuarfherohgoehrifhh84rfr55rfhrfhrek]
    //    0         // 1

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
        
    } catch (error) {
        console.log("JWT Verification Error: ", error.message)
        return res.status(401).json({ message: "Invalid Token", success: false })
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({message: "Access denied"})
        }
        next();
    };
}