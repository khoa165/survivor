const { auth, usernames, user, seeds } = require('./config');
const faker = require('faker');

module.exports = async (numUsers) => {
  console.log('----------------- Seed starts -----------------');
  for (let i = 0; i < numUsers; i++) {
    const email = faker.internet.email().toLowerCase();
    const password = 'HolaGato!';
    const fullname = faker.name.findName();
    const username = (faker.name.firstName() + faker.random.number())
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '');

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        usernames()
          .once('value')
          .then(async (snapshot) => {
            if (!snapshot.exists() || !snapshot.child(username).exists()) {
              // Add username to list.
              await usernames().child(username).set(false);

              // Add id to seed list.
              await seeds().child(authUser.user.uid).set(false);

              // Create a user in your Firebase realtime database.
              await user(authUser.user.uid).set({
                fullname,
                email,
                username,
                roles: {
                  Admin: false,
                  Developer: false,
                  User: true,
                },
                emailVerified: true,
                isSeed: true,
              });
              console.log(`${i}: ${username} was created...`);

              usernames().off();
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
};
