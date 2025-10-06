import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt", token, {
    httpOnly: true,  // Secure from JS access
    secure: process.env.NODE_ENV === "production",  // HTTPS only in prod
    sameSite: "strict",  // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  return token;  // Frontend ignores this now
};