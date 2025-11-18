import jwt from "jsonwebtoken";

export default function auth(roles = []) {
  return function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(user.role))
        return res.status(403).json({ message: "Access Denied" });

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}
