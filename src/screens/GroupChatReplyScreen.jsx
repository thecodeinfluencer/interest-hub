import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Screen from '../components/fragments/Screen';
import GroupChat from '../components/legacy/GroupChat';

export default function GroupChatReplyScreen() {
  const state = useSelector(state => state);
  const params = useParams();

  const { messages } = state.groups.list.filter(({ id }) => id == params.id)[0];

  return (
    <Screen style={{ marginTop: 16 }} title='Replies'>
      <Grid xs={12} item>
        {messages
          ?.filter(({ id }) => params.chatId == id)
          .map(({ id, sender, date, message }) => (
            <GroupChat
              id={id}
              key={id}
              sender={sender}
              time={moment(date).fromNow()}
              content={message}
              replies={messages.filter(({ reply_to }) => reply_to == id)}
              route={`/groups/${params.id}/chats/${id}`}
              feature
            />
          ))}
      </Grid>
      <Grid xs={12} item>
        <Divider className='mb-2' />
        <div className='d-flex align-items-center center-horizontal'>
          <Avatar className='invisible'></Avatar>
          <div className='ms-2'>
            <Typography>
              Replying to{' '}
              {
                messages?.filter(({ id }) => params.chatId == id)[0].sender
                  ?.displayName
              }
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid xs={12} item>
        {messages
          ?.filter(({ reply_to }) => reply_to == params.chatId)
          .map(({ id, sender, date, message }) => (
            <GroupChat
              id={id}
              key={id}
              sender={sender}
              time={moment(date).fromNow()}
              content={message}
              replies={messages.filter(({ reply_to }) => reply_to == id)}
              route={`/groups/${params.id}/chats/${id}`}
              reply
            />
          ))}
      </Grid>
    </Screen>
  );
}
