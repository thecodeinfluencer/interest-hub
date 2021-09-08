import firebase from '../../config/firebase';

const db = firebase.firestore();

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
