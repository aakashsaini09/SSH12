import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Header must exist
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: token missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    next(); // ✅ allow request to continue

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: invalid or expired token"
    });
  }
};
