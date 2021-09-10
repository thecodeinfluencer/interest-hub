import firebase from '../../config/firebase';

const db = firebase.firestore();
const storage = firebase.storage();

export const loadEvents = () => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'EVENTS_BUSY', busy });
    };

    setBusy(true);

    const info = [];

    db.collection('events').onSnapshot(snap => {
      snap.docs.forEach(doc => {
        info.push(doc.data());
        if (info.length === snap.docs.length) {
          dispatch({ type: 'LOAD_EVENTS', info });
          setBusy(false);
        }
      });
    });
  };
};

export const loadEventAttendeesList = eventID => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'EVENTS_BUSY', busy });
    };

    setBusy(true);

    firebase
      .database()
      .ref(`event_attendees/${eventID}`)
      .on('value', data => {
        let memberList = [];
        let length = data.numChildren();
        let userVals = data.val() ? Object.values(data.toJSON()) : [];

        if (!data.val()) {
          let memberList = [];
          let update = {
            memberList,
            eventID,
          };

          dispatch({ type: 'LOAD_ATTENDEES_LIST', update });
          setBusy(false);
        }

        // console.log('uk', userVals);

        userVals.map(({ id: user, surety }) =>
          firebase
            .firestore()
            .collection('users')
            .doc(`${user}`)
            .onSnapshot(snap => {
              memberList.push({ ...snap.data(), surety });

              if (memberList.length === length) {
                let update = {
                  memberList,
                  eventID,
                };

                // console.log('passed', update);

                dispatch({ type: 'LOAD_ATTENDEES_LIST', update });
                setBusy(false);
              }
            })
        );
      });
  };
};

export const createEvent = vals => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    const dbGroupID = Date.now();

    const group = {
      ...vals,
      id: dbGroupID,
    };

    delete group.image;

    storage
      .ref(`/groups/profiles/${dbGroupID}.png`)
      .put(vals.image[0])
      .then(data => {
        data.ref
          .getDownloadURL()
          .then(photoURL => {
            db.collection('groups')
              .doc(`${dbGroupID}`)
              .set({
                ...group,
                photoURL,
              })
              .then(() => {
                dispatch({ type: 'CREATE_GROUP' });
                setBusy(false);
              })
              .catch(err => {
                dispatch({ type: 'CREATE_GROUP_ERR', err });
                console.log('create err: ', err);
                setBusy(false);
              });
          })
          .catch(err => {
            dispatch({ type: 'CREATE_GROUP_ERR', err });
            console.log('upload err: ', err);
            setBusy(false);
          });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_GROUP_ERR', err });
        console.log('upload err: ', err);
        setBusy(false);
      });
  };
};
