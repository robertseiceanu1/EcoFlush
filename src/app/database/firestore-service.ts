// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8EYQJiPlAv-tz96IR--5rVYjMMRLxOX0",
  authDomain: "ecoflush-6d908.firebaseapp.com",
  projectId: "ecoflush-6d908",
  storageBucket: "ecoflush-6d908.appspot.com",
  messagingSenderId: "667215545273",
  appId: "1:667215545273:web:97d95977fe3da0283b2c68",
  measurementId: "G-WSYLV2HQ1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const volumeOfDate = doc(db, 'eco-flush/zNQRTzPdNQ2h36QJGqMl')
const childDoc = doc(volumeOfDate, '01/6dq66kt9VQf6SjpcCoEc');

function writeRecentVolume()
{
  const date = new Date();
  const docData = {
    timestamp: date,
    volume:Math.floor(Math.random() * 40),
  };
  setDoc(childDoc, docData);
}
async function readASingleDocument()
{
  const mySnapshot = await getDoc(childDoc);
  if(mySnapshot.exists()){
    const docData = mySnapshot.data();
    const data = `My data is ${JSON.stringify(docData)}`;
  }
}
function getMostRecentVolume() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    });
}