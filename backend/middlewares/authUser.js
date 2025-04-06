// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv';
// dotenv.config();


// // USer auhtencitcation middleware
// const authUser = async (req,res,next) => {
//     try {
//         const {token} = req.headers;
//         if(!token) {
//             return res.json({success:false, message: "Not authorized, Login Again"})
//         }
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         if (token_decode) {
//             req.body.userId = token_decode.id  
//         }
//         else {
//             return res.json({success:false, message: "Not authorized, Login Again"})
//         }
       
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message: error.message})
//     }
// }

// export default authUser



// authUser.js - Middleware Fix
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authUser = async (req, res, next) => {
    try {
        // Check for token in Authorization header (Bearer token) or custom header
        const authHeader = req.headers.authorization;
        const tokenFromCustomHeader = req.headers.token;
        
        let token;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (tokenFromCustomHeader) {
            token = tokenFromCustomHeader;
        }
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.body.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authUser;