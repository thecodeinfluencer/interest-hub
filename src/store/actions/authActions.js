import axios from 'axios';
import firebase from '../../config/firebase';
import { Environment } from '../local/contents';

const baseUrl = Environment.apiUrl;

export const login = ({ email, password }) => {
  return (dispatch, getState) => {
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
          .doc(`${data.user.uid}`)
          .onSnapshot(snap => {
            let user = snap.data();
            let token = user.uid;
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
  return (dispatch, getState) => {
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
          .doc(`${data.user.uid}`)
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
            uid: data.user.uid,
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

export const requestCode = vals => {
  return (dispatch, getState) => {
    const body = {
      ...vals,
    };

    const setBusy = busy => {
      dispatch({ type: 'RESET_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_RESET_ERROR', err });

    axios
      .post(`${baseUrl}/reset/request`, body)
      .then(res => {
        let user = res.data;
        //
        console.log(user);
        dispatch({ type: 'USER_RESET', user });
        setBusy(false);
      })
      .catch(error => {
        let err = error?.response?.data;
        //
        console.log(err);
        dispatch({ type: 'USER_RESET_ERROR', err });
        setBusy(false);
      });
  };
};

export const createPassword = vals => {
  return (dispatch, getState) => {
    const body = {
      ...vals,
      device_name: 'Device',
    };

    const setBusy = busy => {
      dispatch({ type: 'RESET_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_RESET_ERROR', err });

    axios
      .post(`${baseUrl}/reset`, body)
      .then(res => {
        let user = res.data;
        //
        console.log(user);
        dispatch({ type: 'USER_RESET', user });
        setBusy(false);
      })
      .catch(error => {
        let err = error?.response?.data;
        //
        console.log(err);
        dispatch({ type: 'USER_RESET_ERROR', err });
        setBusy(false);
      });
  };
};

export const updateCredentials = vals => {
  return (dispatch, getState) => {
    const auth = getState().auth.token;

    const config = {
      headers: { Authorization: `Bearer ${auth}` },
    };

    const body = {
      ...vals,
    };

    const setBusy = busy => {
      dispatch({ type: 'PASSWORD_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_PASSWORD_ERROR', err });

    axios
      .put(`${baseUrl}/user/credentials`, body, config)
      .then(res => {
        let info = res.data;
        //
        console.log(info);
        setBusy(false);
        dispatch({ type: 'USER_PASSWORD', info });
      })
      .catch(error => {
        let err = error?.response?.data;
        //
        console.log(error.response);
        console.log(err);
        setBusy(false);
        dispatch({ type: 'USER_PASSWORD_ERROR', err });
      });
  };
};

export const changeAvatar = ({ image }) => {
  return (dispatch, getState) => {
    const auth = getState().auth.token;

    const setBusy = busy => {
      dispatch({ type: 'AVATAR_BUSY', busy });
    };

    setBusy(true);

    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
        // "Content-Type": "application/x-www-form-urlencoded",
        enctype: 'multipart/form-data',
      },
    };

    const body = {
      image,
    };

    console.log('body:', body);

    let err = null;
    dispatch({ type: 'USER_AVATAR_ERROR', err });

    axios
      .post(`${baseUrl}/user`, body, config)
      .then(res => {
        let info = res.data;
        //
        console.log(info);
        dispatch({ type: 'USER_AVATAR', info });
        setBusy(false);
      })
      .catch(error => {
        let err = error?.response?.data;
        //
        console.log(err);
        dispatch({ type: 'USER_AVATAR_ERROR', err });
        setBusy(false);
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
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
