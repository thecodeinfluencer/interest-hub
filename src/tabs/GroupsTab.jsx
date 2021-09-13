import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ListLoading from '../components/fragments/ListLoading';
import Screen from '../components/fragments/Screen';
import CreateGroupCard from '../components/legacy/CreateGroupCard';
import GroupCard from '../components/legacy/GroupCard';
import { loadGroups } from '../store/actions/groupActions';
import '../styles/grid.css';

function removeDuplicates(data, key) {
  return [...new Map(data.map(item => [key(item), item])).values()];
}

export default function GroupsTab() {
  const dispatch = useDispatch();
  const state = useSelector(st => st);

  const groups = removeDuplicates(state.groups.list, item => item.id);
  const loading = state.groups.busy;

  useEffect(() => {
    dispatch(loadGroups());
  }, [dispatch]);

  return (
    <Screen
      style={{ paddingTop: 56 + 16, paddingBottom: 16 }}
      tab
      title='Groups'
    >
      {loading && <ListLoading />}
      {groups.map(({ id, name, photoURL }) => (
        <GroupCard key={id} image={photoURL} name={name} link={id} />
      ))}
      <CreateGroupCard />
    </Screen>
  );
}
