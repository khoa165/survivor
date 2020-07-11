const { admin, usernames, users, seeds } = require('./config');

module.exports = async () => {
  console.log('----------------- Seed starts -----------------');

  try {
    // Remove from username list.
    usernames()
      .orderByValue()
      .equalTo(false)
      .on('value', (snapshot) => {
        snapshot.forEach((child) => {
          child.ref.remove();
        });
      });

    // Remove from user entity.
    users()
      .orderByChild('isSeed')
      .equalTo(true)
      .on('value', (snapshot) => {
        snapshot.forEach((child) => {
          child.ref.remove();
        });
      });

    // Delete user and remove from seed list.
    seeds().on('value', (snapshot) => {
      snapshot.forEach(async (child) => {
        await admin.auth().deleteUser(child.key);
        child.ref.remove();
      });
    });
  } catch (err) {
    console.log(err);
  }
};
