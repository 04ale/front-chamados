import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQUW3fINs4E3OV5mCsnnfVcey0vIA1uJs",
  authDomain: "ticketflow-73b0c.firebaseapp.com",
  projectId: "ticketflow-73b0c",
  storageBucket: "ticketflow-73b0c.firebasestorage.app",
  messagingSenderId: "68804231919",
  appId: "1:68804231919:web:4e9bda96a65f57c797511a",
  measurementId: "G-2LP8TPXHBD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);