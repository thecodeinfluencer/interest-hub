import { Grid } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Screen from '../components/fragments/Screen';
import GroupChat from '../components/legacy/GroupChat';

export default function GroupChatScreen() {
  const state = useSelector(state => state);
  const params = useParams();

  const { messages } = state.groups.list.filter(({ id }) => id == params.id)[0];

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
    </Screen>
  );
}
