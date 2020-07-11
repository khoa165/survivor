require('dotenv').config();
const firebase = require('firebase');

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = firebase.initializeApp(config);

const db = app.database();

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-firebase-template-7311f.firebaseio.com',
});

exports.auth = app.auth();
exports.admin = admin;
exports.usernames = () => db.ref(`usernames`);
exports.users = () => db.ref(`users`);
exports.seeds = () => db.ref(`seeds`);
exports.user = (uid) => db.ref(`users/${uid}`);
