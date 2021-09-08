import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Screen from '../components/fragments/Screen';
import { distance, formatDistance, getInitials } from '../methods';

export default function GroupMembersScreen() {
  const state = useSelector(state => state);
  const user = state.auth.user;
  const history = useHistory();
  const members = history.location.state.members;

  return (
    <Screen style={{ marginTop: 16 }} title='Group Members'>
      <Grid item xs={12}>
        <List style={{ margin: 0, padding: 0 }}>
          {members?.map(person => (
            <ListItem
              style={{
                marginBottom: 10,
              }}
              component={Card}
              variant='outlined'
              key={`${Math.random() * 1000}`}
              onClick={() => history.push(`/people/${person?.uid}`)}
            >
              <ListItemAvatar>
                <Avatar src={person?.photoURL}>{getInitials(person)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={person?.displayName}
                secondary={formatDistance(
                  distance(
                    person?.location?.latitude,
                    person?.location?.longitude,
                    user?.location?.latitude,
                    user?.location?.longitude
                  )
                )}
              />
              {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <ChevronRight />
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
          ))}
        </List>
      </Grid>
    </Screen>
  );
}
