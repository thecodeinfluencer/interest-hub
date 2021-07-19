import firebase from '../../config/firebase';

export const loadMessageList = () => {
  return (dispatch, getState) => {
    const setBusy = busy => {
      dispatch({ type: 'CHATS_BUSY', busy });
    };

    const uid = getState().auth.user.uid;

    setBusy(true);

    firebase
      .database()
      .ref(`message-list/${uid}`)
      .on('value', data => {
        let chatlist = [];
        let length = data.numChildren();
        let userkeys = data.val() ? Object.keys(data.toJSON()) : [];

        // console.log('userkeys: ', data);
        // console.log('userkeys: ', userkeys);

        if (!data.val()) {
          let chatlist = [];
          dispatch({ type: 'LOAD_CHAT_LIST', chatlist });
          setBusy(false);
        }

        userkeys.map(user =>
          firebase
            .firestore()
            .collection('users')
            .doc(`${user}`)
            .onSnapshot(snap => {
              chatlist.push(snap.data());
              // console.log('snapdata: ', snap.data());

              if (chatlist.length === length) {
                dispatch({ type: 'LOAD_CHAT_LIST', chatlist });
                // console.log('messageList: ', chatlist);
                setBusy(false);
              }
            })
        );
      });
  };
};

export const loadChatMessages = () => {
  return (dispatch, getState) => {
    const setBusy = busy => {
      dispatch({ type: 'CHATS_BUSY', busy });
    };

    setBusy(true);

    firebase
      .database()
      .ref(`messages`)
      .on('value', data => {
        let messages = [];
        let length = data.numChildren();
        let uservalues = data.val() ? Object.values(data.toJSON()) : data;

        if (!data.val()) {
          let messages = [];
          dispatch({ type: 'LOAD_MESSAGES', messages });
          setBusy(false);
        }

        data.val() &&
          uservalues?.map((value, index) => {
            messages.push(value);

            if (messages.length === length) {
              dispatch({ type: 'LOAD_MESSAGES', messages });

              // console.log('listtt: ', messages);
              setBusy(false);
            }

            return null;
          });
      });
  };
};

export const updateMessageList = (sender, reciever) => {
  return (dispatch, getState) => {
    //add him to my list
    firebase
      .database()
      .ref(`message-list/${sender}/${reciever}`)
      .set({ id: reciever });

    //add me to his list
    firebase
      .database()
      .ref(`message-list/${reciever}/${sender}`)
      .set({ id: sender });
  };
};

export const sendMessage = (message, sender, reciever) => {
  return (dispatch, getState) => {
    const setBusy = busy => {
      dispatch({ type: 'CHATS_BUSY', busy });
    };

    setBusy(true);

    let body = {
      isseen: false,
      message,
      sender,
      reciever,
    };

    firebase
      .database()
      .ref(`messages`)
      .push(body)
      .then(() => {
        setBusy(false);
      });

    updateMessageList(sender, reciever);
  };
};
