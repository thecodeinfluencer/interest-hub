import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ListEmpty from '../components/fragments/ListEmpty';
import ListLoading from '../components/fragments/ListLoading';
import Screen from '../components/fragments/Screen';
import {
  loadChatMessages,
  loadMessageList,
} from '../store/actions/messageActions';

export default function MessageTab() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state => state);
  const messages = state.messages.chatlist;
  const busy = state.messages.busy;

  useEffect(() => {
    dispatch(loadChatMessages());
    dispatch(loadMessageList());
  }, [dispatch]);

  return (
    <Screen tab title='Messages'>
      <Grid item xs={12}>
        <List style={{ margin: 0, padding: 0, marginTop: 16 }}>
          {messages &&
            messages.map(
              ({ displayName, email, uid, photoURL, firstName, surname }) => (
                <ListItem
                  onClick={() => history.push(`messages/${uid}`)}
                  style={{
                    marginBottom: 10,
                  }}
                  key={`${uid}`}
                  component={Card}
                  variant='outlined'
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        photoURL
                          ? photoURL
                          : `https://ui-avatars.com/api/?background=random&name=${firstName}+${surname}`
                      }
                    >
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={displayName} secondary={email} />
                </ListItem>
              )
            )}
          {!busy && messages.length < 1 && <ListEmpty />}
          {busy && <ListLoading />}
        </List>
      </Grid>
    </Screen>
  );
}
