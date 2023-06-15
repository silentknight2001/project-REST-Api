import  jwt  from "jsonwebtoken";

 // this token wil use with user name during login, not with register;
export const verifytoken = async(req, res, next)=>{
    try {
        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access Denied")
        }

        if (token.startWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}