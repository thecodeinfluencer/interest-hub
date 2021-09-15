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
        let userVals = data.val() ? Object.values(data.toJSON()) : [];

        if (!data.val()) {
          let memberList = [];
          let update = {
            memberList,
            groupID,
          };

          dispatch({ type: 'LOAD_MEMBER_LIST', update });
          setBusy(false);
        }

        userVals.map(({ id: user, admin }) =>
          firebase
            .firestore()
            .collection('users')
            .doc(`${user}`)
            .onSnapshot(snap => {
              memberList.push({ ...snap.data(), admin });

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
                  .set({ id: getState().auth?.user?.uid, admin: true })
                  .then(() => {
                    dispatch({ type: 'CREATE_GROUP' });
                    setBusy(false);
                  })
                  .catch(err => {
                    dispatch({ type: 'GROUP_ERR', err });
                    console.log('create err: ', err);
                    setBusy(false);
                  });
              })
              .catch(err => {
                dispatch({ type: 'GROUP_ERR', err });
                console.log('create err: ', err);
                setBusy(false);
              });
          })
          .catch(err => {
            dispatch({ type: 'GROUP_ERR', err });
            console.log('upload err: ', err);
            setBusy(false);
          });
      })
      .catch(err => {
        dispatch({ type: 'GROUP_ERR', err });
        console.log('upload err: ', err);
        setBusy(false);
      });
  };
};

export const updateGroup = (vals, groupID) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    const group = {
      ...vals,
    };

    delete group.image;

    fdb
      .collection('groups')
      .doc(`${groupID}`)
      .update({
        ...group,
      })
      .then(() => {
        dispatch({ type: 'UPDATE_GROUP' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'GROUP_ERR', err });
        setBusy(false);
      });
  };
};

export const deleteGroup = groupID => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    storage
      .ref(`/groups/profiles/${groupID}.png`)
      .delete()
      .then(() => {
        fdb
          .collection('groups')
          .doc(`${groupID}`)
          .delete()
          .then(() => {
            rdb
              .ref(`group_members/${groupID}`)
              .remove()
              .then(() => {
                dispatch({ type: 'DELETE_GROUP' });
                setBusy(false);
              })
              .catch(err => {
                dispatch({ type: 'GROUP_ERR', err });
                console.log('create err: ', err);
                setBusy(false);
              });
          });
      })
      .catch(err => {
        dispatch({ type: 'GROUP_ERR', err });
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
        dispatch({ type: 'GROUP_ERR', err });
        setBusy(false);
      });
  };
};

export const addMemberToGroup = (userID, groupID) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    rdb
      .ref(`group_members/${groupID}/${userID}`)
      .set({ id: userID, admin: false })
      .then(() => {
        dispatch({ type: 'ADD_GROUP_MEMBER' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'ERR', err });
        setBusy(false);
      });
  };
};

export const removeMemberFromGroup = (userID, groupID) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    rdb
      .ref(`group_members/${groupID}/${userID}`)
      .remove()
      .then(() => {
        dispatch({ type: 'REMOVE_GROUP_MEMBER' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'GROUP_ERR', err });
        setBusy(false);
      });
  };
};

export const makeMemberAdmin = (userID, groupID) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'GROUPS_BUSY', busy });
    };

    setBusy(true);

    rdb
      .ref(`group_members/${groupID}/${userID}`)
      .update({ id: userID, admin: true })
      .then(() => {
        dispatch({ type: 'MAKE_GROUP_MEMBER_ADMIN' });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'GROUP_ERR', err });
        setBusy(false);
      });
  };
};
