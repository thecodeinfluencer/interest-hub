import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '@material-ui/icons';
import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import Screen from '../components/fragments/Screen';
import ListLoading from '../components/fragments/ListLoading';
import ListEmpty from '../components/fragments/ListEmpty';
import { loadForums } from '../store/actions/forumsActions';

export default function ForumTab() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state => state);
  const forums = state.forums.list;
  const busy = state.forums.busy;

  useEffect(() => {
    dispatch(loadForums());
  }, [dispatch]);

  return (
    <Screen tab title='Forums'>
      <Grid item xs={12}>
        <List style={{ margin: 0, padding: 0, marginTop: 16 }}>
          {forums.map(({ id, name, tags, string }) => (
            <ListItem
              onClick={() => history.push(`forums/${string}`)}
              style={{
                marginBottom: 10,
              }}
              key={`${id}`}
              component={Card}
              variant='outlined'
            >
              <ListItemAvatar>
                <Avatar variant='square'>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={tags.map(tag => tag + ', ')}
              />
            </ListItem>
          ))}
          {!busy && forums.length < 1 && <ListEmpty />}
          {busy && <ListLoading />}
        </List>
      </Grid>
    </Screen>
  );
}
