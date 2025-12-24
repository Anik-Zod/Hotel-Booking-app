import { auth } from "../utils/auth.js";


// sign-in
export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Server‑side call to Better Auth
    const result = await auth.api.signIn.email({
      body: {
        email,
        password,
        rememberMe: rememberMe ?? false,
      },
    });

    // If login failed
    if (!result.session) {
      return res.status(401).json({
        message: result.error?.message || "Invalid credentials",
      });
    }

    // Successful
    return res.status(200).json({
      user: result.user,
      session: result.session,
    });

  } catch (err) {
    next(err);
  }
};


// sign-up
export const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }
  try {
    const data = await auth.api.signUp.email({
      body: { email, password, name },
    });
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Registration failed" });
  }
};
