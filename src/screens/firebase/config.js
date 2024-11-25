import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "polaris-subnet-jobs-123",
  appId: "1:616407617950:web:6cff6df856dc736d1a868f",
  storageBucket: "polaris-subnet-jobs-123.firebasestorage.app",
  apiKey: "AIzaSyDUz4SD8X_ih0OFpnnA4XlpEcAaJBeT6mc",
  authDomain: "polaris-subnet-jobs-123.firebaseapp.com",
  messagingSenderId: "616407617950"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with nam5 region
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  localCache: false
});

export const auth = getAuth(app);
export default db;