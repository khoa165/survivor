import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  // *** Merge Auth and DB User API ***

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then((snapshot) => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {
                Admin: false,
                Developer: false,
                User: true,
              };
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  users = () => this.db.ref('users');

  user = (uid) => this.db.ref(`users/${uid}`);

  usernames = () => this.db.ref('usernames');

  // *** Survivor API ***
  contestants = () => this.db.ref('contestants');

  contestant = (name) => this.db.ref(`contestants/${name}`);

  contestantGOATVoteCount = (name) =>
    this.db.ref(`contestants/${name}/votes/GOAT`);

  contestantLegenVoteCount = (name) =>
    this.db.ref(`contestants/${name}/votes/legend`);

  contestantFavoriteVoteCount = (name) =>
    this.db.ref(`contestants/${name}/votes/favorite`);

  winners = () => this.db.ref('winners');

  // *** Voting API ***
  userGOATs = (uid) => this.db.ref(`voting/${uid}/GOATs`);

  userLegends = (uid) => this.db.ref(`voting/${uid}/legends`);

  userFavorites = (uid) => this.db.ref(`voting/${uid}/favorites`);

  voteForGOATs = (uid, contestant) =>
    this.db.ref(`voting/${uid}/GOATs/${contestant}`);

  voteForLegends = (uid, contestant) =>
    this.db.ref(`voting/${uid}/legends/${contestant}`);

  voteForFavorites = (uid, contestant) =>
    this.db.ref(`voting/${uid}/favorites/${contestant}`);
}

export default Firebase;
