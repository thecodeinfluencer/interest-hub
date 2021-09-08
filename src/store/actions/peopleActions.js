import firebase from '../../config/firebase';

const db = firebase.firestore();

export const loadPeople = () => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'PEOPLE_BUSY', busy });
    };

    setBusy(true);

    const info = [];

    db.collection('users').onSnapshot(snap => {
      snap.docs.forEach(doc => {
        info.push(doc.data());
        if (info.length === snap.docs.length) {
          dispatch({ type: 'LOAD_PEOPLE', info });
          setBusy(false);
        }
      });
    });
  };
};
