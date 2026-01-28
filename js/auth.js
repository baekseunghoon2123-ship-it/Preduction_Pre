import { auth, db } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const adjectives = ["Silent", "Broken", "Cold", "Wild"];
const animals = ["Tiger", "Wolf", "Crow", "Fox"];

function nickname() {
  return adjectives[Math.floor(Math.random()*4)] + " " +
         animals[Math.floor(Math.random()*4)];
}

export function initAuth() {
  const loginBtn = document.getElementById("loginBtn");
  const userNick = document.getElementById("userNick");

  if (loginBtn) {
    loginBtn.onclick = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    };
  }

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      if (userNick) userNick.innerText = ""; // Clear nickname if logged out
      return;
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, { nickname: nickname() });
    }

    if (userNick) {
      userNick.innerText = snap.exists()
        ? snap.data().nickname
        : "Anonymous";
    }
  });
}
