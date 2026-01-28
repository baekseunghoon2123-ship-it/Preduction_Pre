// Firebase SDK CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration (from user's snippet, with placeholders for security)
// IMPORTANT: For production, you should use environment variables or a server-side
// process to manage these keys securely.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your Firebase API Key
  authDomain: "YOUR_AUTH_DOMAIN", // Replace with your Firebase Auth Domain
  projectId: "YOUR_PROJECT_ID", // Replace with your Firebase Project ID
  storageBucket: "YOUR_STORAGE_BUCKET", // Add your Storage Bucket if needed
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Add your Messaging Sender ID if needed
  appId: "YOUR_APP_ID", // Add your App ID if needed
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
