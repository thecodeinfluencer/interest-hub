import {
  Avatar,
  Card,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { AddRounded, DoneRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Screen from '../components/fragments/Screen';
import {
  distance,
  formatDistance,
  getInitials,
  removeDuplicates,
} from '../methods';
import {
  addMemberToGroup,
  loadGroupMembersList,
  makeMemberAdmin,
} from '../store/actions/groupActions';

export default function GroupAddMembersScreen() {
  const [search, setSearch] = useState('');
  const state = useSelector(state => state);
  const user = state.auth.user;
  const people = state.people.list;

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  //   const members = history.location.state.members;

  const { members } = state.groups.list.filter(({ id }) => id == params.id)[0];

  let recruits = removeDuplicates(people.concat(members), item => item?.uid);

  useEffect(() => {
    dispatch(loadGroupMembersList(params.id));
  }, [dispatch, params.id]);

  return (
    <Screen style={{ marginTop: 16 }} title='Add Members'>
      <Grid item xs={12}>
        <TextField
          placeholder='Type to search'
          variant='outlined'
          fullWidth
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
          style={{
            background: 'transparent',
            marginBottom: 8,
          }}
        />
        <List style={{ margin: 0, padding: 0 }}>
          {recruits
            ?.filter(({ displayName }) =>
              displayName.toLowerCase().includes(search.toLowerCase())
            )
            .map(person => (
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
                <ListItemSecondaryAction>
                  {person.admin === true && (
                    <Chip color='primary' label='Admin' size='small' />
                  )}
                  {person.admin !== true && person.admin != undefined && (
                    <Chip
                      variant='outlined'
                      color='primary'
                      label='Make Admin'
                      size='small'
                      onClick={() => {
                        dispatch(makeMemberAdmin(person.uid, params.id));
                      }}
                    />
                  )}
                  <IconButton edge='end' aria-label='delete'>
                    {person.admin != undefined ? (
                      <DoneRounded />
                    ) : (
                      <AddRounded
                        onClick={() => {
                          dispatch(addMemberToGroup(person.uid, params.id));
                        }}
                      />
                    )}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Grid>
    </Screen>
  );
}
