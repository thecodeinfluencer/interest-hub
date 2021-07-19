import firebase from '../../config/firebase';

const db = firebase.firestore();

export const loadForums = () => {
  return (dispatch, getState) => {
    const setBusy = busy => {
      dispatch({ type: 'FORUMS_BUSY', busy });
    };

    setBusy(true);

    const info = [];

    db.collection('forums').onSnapshot(snap => {
      snap.docs.forEach(doc => {
        info.push(doc.data());
        if (info.length === snap.docs.length) {
          dispatch({ type: 'LOAD_FORUMS', info });
          setBusy(false);
        }
      });
    });
  };
};

export const loadForumMessages = docRef => {
  return (dispatch, getState) => {
    const setBusy = busy => {
      dispatch({ type: 'FORUMS_BUSY', busy });
    };

    setBusy(true);

    const messages = [];

    async function loadMessages() {
      db.collection('forums')
        .doc(`${docRef}`)
        .collection('messages')
        .orderBy('createdAt')
        .limit(30)
        .onSnapshot(snap => {
          messages.splice(0, messages.length);

          snap.docs.map(async message => {
            const messageUserData = await db
              .collection('users')
              .doc(`${message.data().user}`)
              .get();

            const replies = [];

            message?.data()?.replies &&
              (await message.data().replies.map(async item => {
                const reply = JSON.parse(item);

                const replyUserData = await db
                  .collection('users')
                  .doc(`${reply.user}`)
                  .get();

                replies.push({ ...reply, userData: replyUserData.data() });

                if (replies.length === message?.data()?.replies?.length) {
                  console.log('shud: ', message?.data()?.replies?.length);
                }
              }));

            messages.push({
              ...message.data(),
              userData: messageUserData.data(),
              replies: replies,
            });

            if (messages.length === snap.docs.length) {
              let info = { messages, docRef: `${docRef}` };
              dispatch({ type: 'LOAD_MESSAGES', info });
              setBusy(false);
              console.log(messages);
            }

            //
          });
        });
    }

    loadMessages();
  };
};

export const sendDiscussion = (text, forum) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth.user;
    const messageID = Date.now();

    if (text.length < 3) {
      return;
    }

    const setBusy = busy => {
      dispatch({ type: 'FORUMS_BUSY', busy });
    };

    setBusy(true);

    const messageBody = {
      messageID,
      text,
      user: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection('forums')
      .doc(`${forum}`)
      .collection('messages')
      .doc(`${messageID}`)
      .set({
        ...messageBody,
      })
      .then(info => {
        dispatch({ type: 'SEND_MESSAGE', info });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'SEND_MESSAGE_ERROR', err });
        setBusy(false);
      });
  };
};

export const sendDiscussionReply = (text, forum, message) => {
  return (dispatch, getState) => {
    const { uid, firstName, surname } = getState().auth.user;
    const replyID = Date.now();

    if (text.length < 3) {
      return;
    }

    const setBusy = busy => {
      dispatch({ type: 'FORUMS_BUSY', busy });
    };

    setBusy(true);

    const replyBody = {
      replyID,
      text,
      user: uid,
      sender: firstName + '' + surname,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection('forums')
      .doc(`${forum}`)
      .collection('messages')
      .doc(`${message}`)
      .update({
        replies: firebase.firestore.FieldValue.arrayUnion(
          JSON.stringify(replyBody)
        ),
      })
      .then(info => {
        dispatch({ type: 'SEND_MESSAGE', info });
        setBusy(false);
      })
      .catch(err => {
        dispatch({ type: 'SEND_MESSAGE_ERROR', err });
        setBusy(false);
      });
  };
};
