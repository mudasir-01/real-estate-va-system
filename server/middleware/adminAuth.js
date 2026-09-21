export default function adminAuth(req, res, next) {
  const configured = process.env.ADMIN_KEY;
  if (!configured) return res.status(500).json({ message: "ADMIN_KEY is not configured." });
  const provided = req.headers["x-admin-key"];
  if (provided !== configured) return res.status(401).json({ message: "Unauthorized" });
  next();
}
