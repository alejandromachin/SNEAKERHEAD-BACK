require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASEKEY,
  authDomain: "sneakerhead-263df.firebaseapp.com",
  projectId: "sneakerhead-263df",
  storageBucket: "sneakerhead-263df.appspot.com",
  messagingSenderId: "963506192324",
  appId: "1:963506192324:web:2d0f781eea82218a2b6e91",
};

module.exports = firebaseConfig;
