import { auth } from "../utils/auth.js";

// GET /api/admin/list-users
export async function listUsers(req, res) {
  try {
    // Use your backend auth module to fetch users
    const { data: users, error } = await auth.plugins.admin.listUsers({
      query: { limit: 200, offset: 0 },
    });

    console.log("Fetched users:", users);
    res.json({ users: users || [] });
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ error: err.message || "Failed to fetch users" });
  }
}
