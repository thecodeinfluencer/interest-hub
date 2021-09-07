import { Grid } from '@material-ui/core';
import React from 'react';
import Screen from '../components/fragments/Screen';
import GroupChat from '../components/legacy/GroupChat';

export default function GroupChatScreen() {
  return (
    <Screen style={{ marginTop: 16 }} title='Chats'>
      <Grid xs={12} item>
        {true &&
          [1, 2].map(() => (
            <GroupChat
              key={`${Math.random() * 1000}`}
              name='Mark Aloo'
              time='2 days ago'
              content='lorem ipsum dolor sit amet constrecteur'
              route={`/groups/group1234/chats/chat1234`}
            />
          ))}
      </Grid>
    </Screen>
  );
}
