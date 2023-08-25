// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Timestamp, addDoc, collection, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore"; 
import { NgModule } from "@angular/core";

const firebaseConfig = {
  apiKey: "AIzaSyAjOga1r1bzC7MCwM2MF42jfgg_w2HOhl4",
  authDomain: "ecoflush-88cd1.firebaseapp.com",
  projectId: "ecoflush-88cd1",
  storageBucket: "ecoflush-88cd1.appspot.com",
  messagingSenderId: "818457388560",
  appId: "1:818457388560:web:8491de03468460067d4c95",
  measurementId: "G-T5SLNQ9RM3"
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
  
  dateOfTimestamp(timestamp:Timestamp)
  {
    const timestampNumber = timestamp.seconds * 1000
    let timestampDate = new Date(timestampNumber)
    timestampDate.setHours(0, 0, 0, 0);
    return timestampDate;
  }


  async getSavedVolumes(daysBack: number)
  {
    const currentDate = new Date()

    const dateBack = this.minusDays(currentDate, daysBack);
    dateBack.setHours(0,0,0,0);
    const timestampBack = Timestamp.fromDate(dateBack)

    const volumeQuery = query(
      collection(db, 'eco-flush'),
      where('timestamp', '>=', timestampBack),
      orderBy("timestamp", "asc"), 
    );
    const results = await getDocs(volumeQuery);

    let volumeSaved = new Map<number, number>();
    const volumeseachday = collection(db, 'volumes-each-day')
    for(let i=0; i < results.docs.length-1; i++)
    {
      let dayOfVolume1 = this.dateOfTimestamp(results.docs[i].data()['timestamp']);
      let dayOfVolume2 = this.dateOfTimestamp(results.docs[i+1].data()['timestamp']);

      //console.log(dayOfVolume1, dayOfVolume2, results.docs[i].data()['volume'],results.docs[i+1].data()['volume']);

      if(dayOfVolume1.getTime() === dayOfVolume2.getTime() && results.docs[i].data()['volume']>results.docs[i+1].data()['volume'])
      {
        let currentSavedVolume = volumeSaved.get(dayOfVolume1.getTime());
        if(currentSavedVolume === undefined) {
          currentSavedVolume = 0;
        }
        volumeSaved.set(dayOfVolume1.getTime(), currentSavedVolume + results.docs[i].data()['volume'] - results.docs[i+1].data()['volume']);
      }
      //console.log(volumeSaved.get(dayOfVolume1.getTime()));
    }

    const data = new Array();
    for(const entry of volumeSaved.entries())
    {
      data.push([new Date(entry[0]), entry[1]]);
    }
    return data;
  }

  async getMostRecentTimestamp() {
    const lastTimestampQuery = query(
      collection(db, 'eco-flush'),
      orderBy("timestamp", "desc"), 
      limit(1)
    );
    const results = await getDocs(lastTimestampQuery);
    if(results.docs.length > 0)
      return results.docs[0].data()['timestamp'];
    else
      //1-Jan-2023
      return Timestamp.fromMillis(1672524000000)
  }
  async getDataFor1Day() {
    const currentDate = new Date()
    const volumeQuery = query(
      collection(db, 'eco-flush'),
      where('timestamp', '>=',this.minusDays(currentDate, 1)),
      orderBy("timestamp", "desc"), 
    );
    
    const results = await getDocs(volumeQuery);
    const data = new Array();
    const allDocs = results.forEach((x) => {
      data.push([new Date(x.data()["timestamp"]["seconds"]*1000), x.data()["volume"]]);
    });
    return data;
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

