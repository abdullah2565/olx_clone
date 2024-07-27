import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  FacebookAuthProvider ,
  signOut
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDS0It9CQdX7RovaBz7lSjXF1QtkWP67X0",
  authDomain: "olx-clone-707b1.firebaseapp.com",
  projectId: "olx-clone-707b1",
  storageBucket: "olx-clone-707b1.appspot.com",
  messagingSenderId: "645335990169",
  appId: "1:645335990169:web:ef57da829854af34375d08",
  measurementId: "G-M7XRSSDS01"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const fbprovider = new FacebookAuthProvider();

export { db };

export async function getAllProducts() {
  const querySnapshot = await getDocs(collection(db, "Products"));
  const products = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}

export async function getSingleAd(id) {
  const docRef = doc(db, "Products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}
export async function getUserInfo(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    return userData;
  } else {
    return null;
  }
}


export async function register(userInfo) {
  const { fullname, email, password } = userInfo;
  const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password);
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { email, fullname });
  alert('Registered Successfully!');
}

export async function login(userInfo) {
  const { email, password } = userInfo;
  await signInWithEmailAndPassword(auth, email, password);
  alert('Logged In Successfully!');
}


export async function signupwithgoogle() {
  await signInWithPopup(auth, provider)
}
export async function signupwithfacebook() {
  await signInWithPopup(auth, fbprovider)
}
export default function Logout() {
  signOut(auth)
}