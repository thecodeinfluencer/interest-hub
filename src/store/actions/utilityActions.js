import firebase from '../../config/firebase';

export const getUserFromID = uid => {
  let user = {};
  const fetchObject = async () => {
    await firebase
      .firestore()
      .collection(`users`)
      .doc(`${uid}`)
      .get()
      .then(data => {
        user = data.data();
      });
    return user;
  };

  fetchObject().then(data => {
    user = data;
    return user;
  });

  console.log(user);
};
