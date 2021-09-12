import firebase from '../../config/firebase';

const fdb = firebase.firestore();
const rdb = firebase.database();
const storage = firebase.storage();

export const loadGroups = () => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    const info = [];

    fdb.collection('groups').onSnapshot(snap => {
      snap.docs.forEach(doc => {
        info.push(doc.data());
        if (info.length === snap.docs.length) {
          dispatch({ type: 'LOAD_GROUPS', info });
          setBusy(false);
        }
      });
    });
  };
};

export const loadGroupMembersList = groupID => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    firebase
      .database()
      .ref(`group_members/${groupID}`)
      .on('value', data => {
        let memberList = [];
        let length = data.numChildren();
        let userkeys = data.val() ? Object.keys(data.toJSON()) : [];

        if (!data.val()) {
          let memberList = [];
          let update = {
            memberList,
            groupID,
          };

          dispatch({ type: 'LOAD_MEMBER_LIST', update });
          setBusy(false);
        }

        userkeys.map(user =>
          firebase
            .firestore()
            .collection('users')
            .doc(`${user}`)
            .onSnapshot(snap => {
              memberList.push(snap.data());

              if (memberList.length === length) {
                let update = {
                  memberList,
                  groupID,
                };

                dispatch({ type: 'LOAD_MEMBER_LIST', update });
                setBusy(false);
              }
            })
        );
      });
  };
};

export const loadGroupMessagesList = groupID => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    firebase
      .database()
      .ref(`group_messages/${groupID}`)
      .on('value', data => {
        let messageList = [];
        let length = data.numChildren();

        if (!data.val()) {
          let messageList = [];
          let update = {
            messageList,
            groupID,
          };

          dispatch({ type: 'LOAD_MESSAGE_LIST', update });
          setBusy(false);
          return;
        }

        Object.values(data.val())?.map(message =>
          firebase
            .firestore()
            .collection('users')
            .doc(`${message.sender}`)
            .onSnapshot(snap => {
              messageList.push({ ...message, sender: snap.data() });

              console.log('insnap: ', snap.exists);

              if (messageList.length === length) {
                let update = {
                  messageList,
                  groupID,
                };

                dispatch({ type: 'LOAD_MESSAGE_LIST', update });
                setBusy(false);
              }
            })
        );
      });
  };
};

export const createGroup = vals => {
  return (dispatch, getState) => {
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
            fdb
              .collection('groups')
              .doc(`${dbGroupID}`)
              .set({
                ...group,
                photoURL,
              })
              .then(() => {
                rdb
                  .ref(
                    `group_members/${dbGroupID}/${getState().auth?.user?.uid}`
                  )
                  .set({ id: getState().auth?.user?.uid })
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

export const sendGroupMessage = (groupID, message, reply_to) => {
  return (dispatch, getState) => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);
    const date = Date.now();

    rdb
      .ref(`group_messages/${groupID}/${date}`)
      .set({
        sender: getState().auth?.user?.uid,
        date,
        id: date,
        reply_to: reply_to || false,
        message,
      })
      .then(() => {
        dispatch({ type: 'SEND_GROUP_MESSAGE' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'CREATE_GROUP_ERR', err });
        setBusy(false);
      });
  };
};
