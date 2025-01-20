import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  try {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d", // 1 day expiry
    });

    // Set cookie with security attributes only in production
    return res.status(200).cookie("token", token, {
      httpOnly: true,
      sameSite: "None",  // Only for production (cross-origin)
      secure: true,      // Only for production (secure cookie)
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
    }).json({
      success: true,
      message,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to generate token" });
  }
};
