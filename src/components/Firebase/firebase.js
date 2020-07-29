import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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
    this.storage = app.storage();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Image API ***

  storageRef = () => this.storage.ref();

  usersStorageRef = () => this.storageRef().child('users');

  userAvatarRef = (uid) => this.usersStorageRef().child(uid).child('avatar');

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
        this.userPublicInfo(authUser.uid)
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

  user = (uid) => this.users().child(uid);

  userPublicInfo = (uid) => this.user(uid).child('public');

  userPrivateInfo = (uid) => this.user(uid).child('private');

  usernames = () => this.db.ref('usernames');

  // *** Survivor API ***

  contestants = () => this.db.ref('contestants');

  contestant = (name) => this.contestants().child(name);

  contestantVotes = (name) => this.contestant(name).child('votes');

  contestantGOATVoteCount = (name) => this.contestantVotes(name).child('GOAT');

  contestantLegenVoteCount = (name) =>
    this.contestantVotes(name).child('legend');

  contestantFavoriteVoteCount = (name) =>
    this.contestantVotes(name).child('favorite');

  winners = () => this.db.ref('winners');

  // *** Voting API ***
  voting = () => this.db.ref('voting');

  userVoting = (uid) => this.voting().child(uid);

  userGOATs = (uid) => this.userVoting(uid).child('GOATs');

  userLegends = (uid) => this.userVoting(uid).child('legends');

  userFavorites = (uid) => this.userVoting(uid).child('favorites');

  voteForGOATs = (uid, contestant) => this.userGOATs(uid).child(contestant);

  voteForLegends = (uid, contestant) => this.userLegends(uid).child(contestant);

  voteForFavorites = (uid, contestant) =>
    this.userFavorites(uid).child(contestant);
}

export default Firebase;
