async function logoutUser(req, res) {
  let invalidatedTokens = [];
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    invalidatedTokens.push(token);
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging out user",
      error: error.message,
    });
  }
}

export default logoutUser;
