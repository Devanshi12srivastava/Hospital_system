import jwt from "jsonwebtoken";

//user auth middleware

const authuser = async (req, res, next) => {
  console.log("headers:", req.headers);
  
  try {
    const { usertoken } = req.headers;
    if (!usertoken) {
      return res.json({ success: false, message: "Not Authorized" });
    }
    const tokenDecode = jwt.verify(usertoken, process.env.JWT_SECRET);
    console.log(tokenDecode);
    req.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

};
export default authuser;
