import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
let isFirebaseAdminInitialized = false;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    isFirebaseAdminInitialized = true;
    console.log("Firebase Admin initialized successfully from environment variable.");
  } else {
    const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      isFirebaseAdminInitialized = true;
      console.log("Firebase Admin initialized successfully from local file.");
    } else {
      console.warn("FIREBASE_SERVICE_ACCOUNT not found and local file missing. Admin creation via dashboard will be disabled.");
    }
  }
} catch (e) {
  console.error("Error initializing Firebase Admin:", e);
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
    const { email, password, idToken } = req.body;

    if (!email || !password || !idToken) {
      return res.status(400).json({ error: "Email, password, and idToken are required." });
    }

    if (!isFirebaseAdminInitialized) {
      return res.status(500).json({ error: "Firebase Admin is not configured. Please add FIREBASE_SERVICE_ACCOUNT to settings or upload the JSON file." });
    }

    try {
      // 1. Verify the requester is actually an admin
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const adminUid = decodedToken.uid;
      const db = admin.firestore();
      const adminUser = await admin.auth().getUser(adminUid);
      console.log("Admin user found:", adminUser.email);
      
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
