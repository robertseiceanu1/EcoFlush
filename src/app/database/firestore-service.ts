// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Timestamp, addDoc, collection, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore"; 
import { NgModule } from "@angular/core";

const firebaseConfig = {
  apiKey: "AIzaSyD9NiZ67jFDof9ZIVGbeLBmRysK3eWArv4",
  authDomain: "ecoflush-7c243.firebaseapp.com",
  projectId: "ecoflush-7c243",
  storageBucket: "ecoflush-7c243.appspot.com",
  messagingSenderId: "718743238738",
  appId: "1:718743238738:web:8d32168382dea6085a878b",
  measurementId: "G-416P1V5PGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@NgModule({
})
export class FirebaseService {
  minusDays(date: Date, days: number) {
    date.setDate(date.getDate() - days);
    return date;
  }

  async getMostRecentVolume() {
    const lastVolumeQuery = query(
      collection(db, 'eco-flush'),
      orderBy("timestamp", "desc"), 
      limit(1)
    );
    const results = await getDocs(lastVolumeQuery);
    return results.docs[0].data()['volume'];
  }
  
  async getMostRecentTimestamp() {
    const lastTimestampQuery = query(
      collection(db, 'eco-flush'),
      orderBy("timestamp", "desc"), 
      limit(1)
    );
    const results = await getDocs(lastTimestampQuery);
    console.log(results);
    if(results.docs.length > 0)
      return results.docs[0].data()['timestamp'];
    else
      //1-Jan-2023
      return Timestamp.fromMillis(1672524000000)
  }

  async getData(days: number) {
    const currentDate = new Date()
    const volumeQuery = query(
      collection(db, 'eco-flush'),
      where('timestamp', '>=',this.minusDays(currentDate, days)),
      orderBy("timestamp", "desc"), 
    );
    
    const results = await getDocs(volumeQuery);
    const data = new Array();
    const allDocs = results.forEach((x) => {
      data.push([new Date(x.data()["timestamp"]["seconds"]*1000), x.data()["volume"]]);
    });
    return data;
  }

  async addNewDocuments() {
    const currentDate = new Date()
    const lastTimestamp = this.getMostRecentTimestamp()
    const timestampAsANumber = (await lastTimestamp).seconds*1000;
    console.log(timestampAsANumber);
    const ecoflush = collection(db, 'eco-flush')
    for(let i=timestampAsANumber; i<= currentDate.getTime(); i= i+3600000)
    {
      console.log(i);
      const newDoc = await addDoc(ecoflush, {
        timestamp: Timestamp.fromMillis(i),
        volume: Math.floor(Math.random() * 40)
      });
    }
  }
}
// function writeRecentVolume()
// {
//   const date = new Date();
//   const docData = {
//     timestamp: date,
//     volume:Math.floor(Math.random() * 40),
//   };
//   setDoc(volumeDocs, docData);
// }
//
//
// async function readASingleDocument()
// {
//   const mySnapshot = await getDoc(volumeOfDate);
//   if(mySnapshot.exists()){
//     const docData = mySnapshot.data();
//     const data = `My data is ${JSON.stringify(docData)}`;
//   }
// }
//
// function listenToADocument()
// {
//   onSnapshot(volumeOfDate, (docSnapshot) => {
//     if(docSnapshot.exists()) {
//       const docData = docSnapshot.data();
//       console.log(`In realtime, docData is ${JSON.stringify(docData)}`);
//     }
//   });

