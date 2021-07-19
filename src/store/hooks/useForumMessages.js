import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import { loadForumMessages } from '../actions/forumsActions';

export default function useForumMessages(forum) {
  const [messagesExport, setMessagesExport] = useState([]);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const messages = state?.forums[`${forum}`];

  useEffect(() => {
    dispatch(loadForumMessages(forum));

    let newMessagesArray = [];

    messages.map(message =>
      firebase
        .firestore()
        .collection(`users`)
        .doc(`${message.user}`)
        .get()
        .then(data => {
          let sth = { ...message, userData: data.data() };
          newMessagesArray.push(sth);

          if (newMessagesArray.length === messages.length) {
            setMessagesExport(newMessagesArray);
          }
        })
    );
  }, [messages, dispatch, forum]);

  return messagesExport;
}
