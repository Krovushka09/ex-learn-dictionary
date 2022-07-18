import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc
} from 'firebase/firestore'

let dbCollection = (function (){

    let instance = null;

    function createInstance() {
      const firebaseConfig = {
        apiKey: "AIzaSyCn05A86w2sLHzQSfv9zAINknvbZuSnFyo",
        authDomain: "extansion-words.firebaseapp.com",
        projectId: "extansion-words",
        storageBucket: "extansion-words.appspot.com",
        messagingSenderId: "929690993545",
        appId: "1:929690993545:web:7891a87d8fc3e0c8445758"
      };
      
      
      const app = initializeApp(firebaseConfig);
      
      const db = getFirestore(app);

      const colRef = collection(db, 'words-en-ru'),
      
      return {
        colRef: collection(db, 'words-en-ru'),
        addDoc: function(item) {
          return addDoc(colRef, item);
        }
      }
    }

    return instance || (instance = createInstance());
})();

//module.exports = dbCollection;
/*
const firebaseConfig = {
    apiKey: "AIzaSyCn05A86w2sLHzQSfv9zAINknvbZuSnFyo",
    authDomain: "extansion-words.firebaseapp.com",
    projectId: "extansion-words",
    storageBucket: "extansion-words.appspot.com",
    messagingSenderId: "929690993545",
    appId: "1:929690993545:web:7891a87d8fc3e0c8445758"
  };
  
  
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);
  
  const colRef = collection(db, 'words-en-ru');*/
