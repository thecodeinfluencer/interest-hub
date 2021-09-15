import firebase from '../../config/firebase';
import { getRandomColor } from '../../methods';

export const login = ({ email, password }) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'LOGIN_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_LOGIN_ERROR', err });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        firebase
          .firestore()
          .collection('users')
          .doc(`${data.user?.uid}`)
          .onSnapshot(snap => {
            let user = snap?.data();
            let token = user?.uid;
            dispatch({ type: 'USER_LOGIN', user });
            dispatch({ type: 'USER_LOGIN_TOKEN', token });
            console.log('loginnn: ', user);
            setBusy(false);
          });

        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'USER_LOGIN_ERROR', err });
        setBusy(false);
      });
  };
};

export const loadUserData = () => {
  return (dispatch, getState) => {
    const setBusy = busy => {
      dispatch({ type: 'UPDATE_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_UPDATE_ERROR', err });

    firebase
      .firestore()
      .collection('users')
      .doc(`${getState().auth?.user?.uid}`)
      .onSnapshot(snap => {
        let user = snap.data();
        dispatch({ type: 'USER_UPDATE', user });
        setBusy(false);
      });
  };
};

export const register = values => {
  return dispatch => {
    let {
      firstName,
      surname,
      gender,
      dob,
      phoneNumber,
      email,
      password,
      location,
      interests,
    } = values;

    const setBusy = busy => {
      dispatch({ type: 'REGISTER_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_REGISTER_ERROR', err });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data.user);

        firebase
          .firestore()
          .collection('users')
          .doc(`${data.user?.uid}`)
          .set({
            ...data.user.providerData[0],
            displayName: firstName + ' ' + surname,
            firstName,
            surname,
            dob,
            gender,
            location,
            phoneNumber,
            interests,
            photoURL: `https://ui-avatars.com/api/?name=${firstName}+${surname}&background=${getRandomColor()}`,
            uid: data.user?.uid,
          })
          .then(() => {
            dispatch({ type: 'USER_REGISTER' });
            setBusy(false);
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: 'USER_REGISTER_ERROR', err });
            setBusy(false);
          });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'USER_REGISTER_ERROR', err });
        setBusy(false);
      });
  };
};

export const update = values => {
  return (dispatch, getState) => {
    let { firstName, surname, bio, phoneNumber, email, location, interests } =
      values;

    const setBusy = busy => {
      dispatch({ type: 'UPDATE_BUSY', busy });
    };

    setBusy(true);

    firebase
      .firestore()
      .collection('users')
      .doc(`${getState().auth.user?.uid}`)
      .update({
        displayName: firstName + ' ' + surname,
        firstName,
        surname,
        email,
        bio,
        location,
        phoneNumber,
        interests,
        photoURL: `https://ui-avatars.com/api/?name=${firstName}+${surname}&background=${getRandomColor()}`,
      })
      .then(() => {
        // dispatch({ type: 'USER_UPDATE' });
        setBusy(false);
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'USER_UPDATE_ERROR', err });
        setBusy(false);
      });
  };
};

export const logout = () => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'LOGIN_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_LOGOUT_ERROR', err });

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'USER_LOGOUT' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'USER_LOGOUT_ERROR', err });
        setBusy(false);
      });
  };
};
