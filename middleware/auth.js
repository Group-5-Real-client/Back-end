import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.admin = decoded;
    console.log(req.admin.isSuper);
    if (req.admin.isSuper !== true) {
      return res.status(403).send("Forbidden");
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default auth;
