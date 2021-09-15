import firebase from '../../config/firebase';

const fdb = firebase.firestore();
const rdb = firebase.database();
const storage = firebase.storage();

export const loadEvents = () => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'EVENTS_BUSY', busy });
    };

    setBusy(true);

    const info = [];

    fdb.collection('events').onSnapshot(snap => {
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

                dispatch({ type: 'LOAD_ATTENDEES_LIST', update });
                setBusy(false);
              }
            })
        );
      });
  };
};

export const createEvent = vals => {
  return (dispatch, getState) => {
    const setBusy = busy => {
      dispatch({ type: 'EVENTS_BUSY', busy });
    };

    setBusy(true);

    const dbEventID = Date.now();

    const event = {
      ...vals,
      id: dbEventID,
    };

    delete event.image;

    storage
      .ref(`/events/banners/${dbEventID}.png`)
      .put(vals.image[0])
      .then(data => {
        data.ref
          .getDownloadURL()
          .then(photoURL => {
            fdb
              .collection('events')
              .doc(`${dbEventID}`)
              .set({
                ...event,
                photoURL,
              })
              .then(() => {
                rdb
                  .ref(
                    `event_attendees/${dbEventID}/${getState().auth?.user?.uid}`
                  )
                  .set({ id: getState().auth?.user?.uid, surety: 'yes' })
                  .then(() => {
                    dispatch({ type: 'CREATE_EVENT' });
                    setBusy(false);
                  })
                  .catch(err => {
                    dispatch({ type: 'EVENT_ERR', err });
                    setBusy(false);
                  });
              })
              .catch(err => {
                dispatch({ type: 'EVENT_ERR', err });
                setBusy(false);
              });
          })
          .catch(err => {
            dispatch({ type: 'EVENT_ERR', err });
            console.log('upload err: ', err);
            setBusy(false);
          });
      })
      .catch(err => {
        dispatch({ type: 'EVENT_ERR', err });
        console.log('upload err: ', err);
        setBusy(false);
      });
  };
};

export const updateEvent = (vals, eventID) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'EVENTS_BUSY', busy });
    };

    setBusy(true);

    const event = {
      ...vals,
    };

    delete event.image;

    fdb
      .collection('events')
      .doc(`${eventID}`)
      .update({
        ...event,
      })
      .then(() => {
        dispatch({ type: 'UPDATE_EVENT' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'EVENT_ERR', err });
        setBusy(false);
      });
  };
};

export const deleteEvent = eventID => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'EVENTS_BUSY', busy });
    };

    setBusy(true);

    storage
      .ref(`/events/banners/${eventID}.png`)
      .delete()
      .then(() => {
        fdb
          .collection('events')
          .doc(`${eventID}`)
          .delete()
          .then(() => {
            rdb
              .ref(`event_attendees/${eventID}}`)
              .remove()
              .then(() => {
                dispatch({ type: 'DELETE_EVENT' });
                setBusy(false);
              })
              .catch(err => {
                dispatch({ type: 'EVENT_ERR', err });
                setBusy(false);
              });
          })
          .catch(err => {
            dispatch({ type: 'EVENT_ERR', err });
            setBusy(false);
          });
      })
      .catch(err => {
        dispatch({ type: 'EVENT_ERR', err });
        setBusy(false);
      });
  };
};

export const addAttendeeToEvent = (eventID, attendeeID, surety) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'EVENTS_BUSY', busy });
    };

    setBusy(true);

    rdb
      .ref(`event_attendees/${eventID}/${attendeeID}`)
      .set({ id: attendeeID, surety })
      .then(() => {
        dispatch({ type: 'ADD_EVENT_ATTENDEE' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'EVENT_ERR', err });
        setBusy(false);
      });
  };
};

export const removeAttendeeFromEvent = (eventID, attendeeID) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'EVENTS_BUSY', busy });
    };

    setBusy(true);

    rdb
      .ref(`event_attendees/${eventID}/${attendeeID}`)
      .remove()
      .then(() => {
        dispatch({ type: 'REMOVE_EVENT_ATTENDEE' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'EVENT_ERR', err });
        setBusy(false);
      });
  };
};
