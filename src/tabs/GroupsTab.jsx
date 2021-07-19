import React from 'react';
import Screen from '../components/fragments/Screen';
import GroupCard from '../components/legacy/GroupCard';
import { groups } from '../store/local/contents';
import '../styles/grid.css';

export default function GroupsTab() {
  return (
    <Screen
      style={{ paddingTop: 56 + 16, paddingBottom: 16 }}
      tab
      title='Groups'
    >
      {groups.map(({ name }) => (
        <GroupCard
          image={`https://picsum.photos/id/${Math.floor(
            Math.random() * 200
          )}/200/300`}
          name={name}
          key={`${Math.random() * 1000}`}
        />
      ))}
    </Screen>
  );
}
