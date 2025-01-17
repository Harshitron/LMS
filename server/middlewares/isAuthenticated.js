import jwt from "jsonwebtoken";

export const isAuthenticated = async(req,res,next) => {
    try {
        
        // first we will bring token from browser cookie
        const token = req.cookies.token
        // then we will verify the token
        if(!token) {
            return res.status(401).json({message: "Please login to access this resource", success: false})
        }
        // now we will decode(verify) the token from the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // now we will check if the decoded user is the same as the user in the database
        if(!decoded) {
            return res.status(401).json({message: "Invalid token", success: false})
        }

        req.id = decoded.userId;
        next()

    } catch (error) {
        console.log(error);
    }
} 