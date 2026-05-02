import jwt from "jsonwebtoken";

//doctor auth middleware

const authDoctor = async (req, res, next) => {
  try {
     const docId = req.docId; 
    const authHeader = req.headers.authorization;

    console.log("AuthHeader:", authHeader); // debug

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token); // debug

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded); // debug

    req.docId = decoded.id;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
export default authDoctor;
