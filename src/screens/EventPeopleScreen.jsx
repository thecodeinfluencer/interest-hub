import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Screen from '../components/fragments/Screen';
import { distance, formatDistance, getInitials } from '../methods';

export default function EventPeopleScreen() {
  const state = useSelector(state => state);
  const user = state.auth.user;

  return (
    <Screen style={{ marginTop: 16 }} title='Members Attending'>
      <Grid item xs={12}>
        <List style={{ margin: 0, padding: 0 }}>
          {[1, 2, 3, 4].map(person => (
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
                <Avatar
                  src={
                    person?.photoURL
                      ? person?.photoURL
                      : `https://ui-avatars.com/api/?name=${person?.firstName}+${person?.surname}&background=random`
                  }
                >
                  {getInitials(person)}
                </Avatar>
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
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid xs={12} item>
        <Typography
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
          variant='h6'
          noWrap={true}
        >
          Maybe Attending
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <List style={{ margin: 0, padding: 0 }}>
          {[1, 2, 3, 4].map(person => (
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
                <Avatar
                  src={
                    person?.photoURL
                      ? person?.photoURL
                      : `https://ui-avatars.com/api/?name=${person?.firstName}+${person?.surname}&background=random`
                  }
                >
                  {getInitials(person)}
                </Avatar>
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
            </ListItem>
          ))}
        </List>
      </Grid>
    </Screen>
  );
}
