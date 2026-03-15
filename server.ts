import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
// Note: User needs to provide FIREBASE_SERVICE_ACCOUNT in settings
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (e) {
    console.error("Error initializing Firebase Admin:", e);
  }
} else {
  console.warn("FIREBASE_SERVICE_ACCOUNT not found. Admin creation via dashboard will be disabled.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Create Admin User Endpoint
  app.post("/api/admin/create-user", async (req, res) => {
    const { email, password, adminUid } = req.body;

    if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
      return res.status(500).json({ error: "Firebase Admin is not configured. Please add FIREBASE_SERVICE_ACCOUNT to settings." });
    }

    try {
      // 1. Verify the requester is actually an admin
      const db = admin.firestore();
      const adminUser = await admin.auth().getUser(adminUid);
      
      // Primary admin check
      const isPrimaryAdmin = adminUser.email?.toLowerCase() === 'sawpyaephyokyaw7@gmail.com';
      
      // Secondary admin check
      const allowedAdminDoc = await db.collection('allowedAdmins').doc(adminUser.email?.toLowerCase() || '').get();
      const isAllowedAdmin = allowedAdminDoc.exists && allowedAdminDoc.data()?.role === 'admin';

      if (!isPrimaryAdmin && !isAllowedAdmin) {
        return res.status(403).json({ error: "Unauthorized. Only admins can create new users." });
      }

      // 2. Create the user in Firebase Auth
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
        emailVerified: true,
      });

      res.json({ success: true, uid: userRecord.uid });
    } catch (error: any) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: error.message || "Failed to create user." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
