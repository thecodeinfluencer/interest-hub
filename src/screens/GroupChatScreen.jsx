import { Grid } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ChatInput from '../components/fragments/ChatInput';
import Screen from '../components/fragments/Screen';
import GroupChat from '../components/legacy/GroupChat';
import {
  loadGroupMessagesList,
  sendGroupMessage,
} from '../store/actions/groupActions';

export default function GroupChatScreen() {
  const [text, setText] = useState();

  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const params = useParams();

  const { messages } = state.groups.list.filter(({ id }) => id == params.id)[0];

  useEffect(() => {
    dispatch(loadGroupMessagesList(params.id));
  }, []);

  return (
    <Screen style={{ marginTop: 16 }} title='Chats'>
      <Grid xs={12} item>
        {messages
          ?.filter(({ reply_to }) => reply_to == false)
          .map(({ id, sender, date, message }) => (
            <GroupChat
              id={id}
              key={id}
              sender={sender}
              time={moment(date).fromNow()}
              content={message}
              replies={messages.filter(({ reply_to }) => reply_to == id)}
              route={`/groups/${params.id}/chats/${id}`}
            />
          ))}
      </Grid>
      <ChatInput
        value={text}
        onChange={e => setText(e.target.value)}
        onSend={() => {
          dispatch(sendGroupMessage(params.id, text));
          setText('');
        }}
      />
    </Screen>
  );
}
