import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import firebase from '../../config/firebase';

export default function useForumReplies(replies) {
  const [repliesExport, setRepliesExport] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let newRepliesArray = [];

    replies.map(reply => {
      reply = JSON.parse(reply);

      return firebase
        .firestore()
        .collection(`users`)
        .doc(`${reply.user}`)
        .get()
        .then(data => {
          let sth = { ...reply, userData: data.data() };
          newRepliesArray.push(sth);

          if (newRepliesArray.length === replies.length) {
            setRepliesExport(newRepliesArray);
          }
        });
    });
  }, [dispatch, replies]);

  return repliesExport;
}
