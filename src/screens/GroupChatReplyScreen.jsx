import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Screen from '../components/fragments/Screen';
import GroupChat from '../components/legacy/GroupChat';

export default function GroupChatReplyScreen() {
  return (
    <Screen style={{ marginTop: 16 }} title='Replies'>
      <Grid xs={12} item>
        {true &&
          [1].map(() => (
            <GroupChat
              key={`${Math.random() * 1000}`}
              name='Mark Aloo'
              time='2 days ago'
              content='lorem ipsum dolor sit amet constrecteur'
            />
          ))}
      </Grid>
      <Grid xs={12} item>
        <Divider className='mb-2' />
        <div className='d-flex align-items-center center-horizontal'>
          <Avatar className='invisible'></Avatar>
          <div className='ms-2'>
            <Typography>Replying to Mark Aloo</Typography>
          </div>
        </div>
      </Grid>
      <Grid xs={12} item>
        {true &&
          [1, 2].map(() => (
            <GroupChat
              key={`${Math.random() * 1000}`}
              name='Mark Aloo'
              time='2 days ago'
              content='lorem ipsum dolor sit amet constrecteur'
            />
          ))}
      </Grid>
    </Screen>
  );
}
