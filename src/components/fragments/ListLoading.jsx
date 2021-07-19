import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';

export default function ListLoading() {
  return (
    <Container
      maxWidth='sm'
      style={{
        paddingTop: 102,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <CircularProgress />
    </Container>
  );
}
