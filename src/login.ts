import { publishSession } from "./sessions";
import fetch1 from "./fetch1";
import { signInWithEmailAndPassword, getAuth, Auth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: __FIREBASE_API_KEY__,
  authDomain: __FIREBASE_AUTH_DOMAIN__,
  databaseURL: __FIREBASE_DATABASE_URL__,
  projectId: __FIREBASE_PROJECT_ID__,
  storageBucket: __FIREBASE_STORAGE_BUCKET__,
  messagingSenderId: __FIREBASE_MESSAGING_SENDER_ID__,
  appId: __FIREBASE_APP_ID__,
};

let _auth: Auth;

function _getAuth() {
  if (!_auth) {
    const app = initializeApp(firebaseConfig);
    _auth = getAuth(app);
  }

  return _auth;
}

export async function login(email: string, password: string): Promise<boolean> {
  const res = await fetch1("account/login", false, "POST", {
    email,
    password,
  });

  if (!res.ok) return false;

  const token = await res.text();

  window.localStorage.setItem("token", token);
  window.localStorage.setItem("email", email);

  const cred = await signInWithEmailAndPassword(_getAuth(), email, password);

  window.localStorage.setItem("firebase_token", await cred.user.getIdToken());

  publishSession();

  return true;
}
