import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import {
    getFirestore,
    collection,
    addDoc
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';

console.log("background");
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
  const colRef = collection(db, 'words-en-ru');

  chrome.runtime.onMessage.addListener(function(msg,sender) {
    if (msg.from == "content") {
        addDoc(colRef, {
            en: msg.en,
            ru: msg.ru
        });
        /*
        let contentTabId = sender.tab.id;
        chrome.tabs.sendMessage(contentTabId, {
            from: "background",
            col: colRef
        });
        */
    }
  });