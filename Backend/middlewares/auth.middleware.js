import jwt from "jsonwebtoken"


export const authenticate = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith(`Bearer `)) {
        return res.status(401).json({ message: "No Token Provided", success: false })
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


// create another middleware which will run after the above middleware

export const isAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if (user.role === "admin") {
            next();
        }
        return res.status(401).json({ message: "Access Denied", success: false })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }

}