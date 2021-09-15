import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListLoading from '../components/fragments/ListLoading';
import Screen from '../components/fragments/Screen';
import CreateGroupCard from '../components/legacy/CreateGroupCard';
import GroupCard from '../components/legacy/GroupCard';
import { removeDuplicates } from '../methods';
import {
  loadGroupMembersList,
  loadGroups,
} from '../store/actions/groupActions';
import '../styles/grid.css';

export default function GroupsTab() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const groups = removeDuplicates(state.groups.list, item => item.id).filter(
    ({ name }) => name.toLowerCase().includes(search.toLowerCase())
  );
  const loading = state.groups.busy;

  useEffect(() => {
    dispatch(loadGroups());
    groups.map(({ id }) => dispatch(loadGroupMembersList(id)));
  }, [dispatch]);

  return (
    <Screen
      style={{ paddingTop: 56 + 16, paddingBottom: 16 }}
      tab
      title='Groups'
    >
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
      {loading && <ListLoading />}
      {groups.map(({ id, name, photoURL }) => (
        <GroupCard key={id} image={photoURL} name={name} link={id} />
      ))}
      <CreateGroupCard />
    </Screen>
  );
}
