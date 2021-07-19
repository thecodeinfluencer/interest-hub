import React from 'react';
import { Container, Typography } from '@material-ui/core';
import empty from '../../assets/empty.svg';

export default function ListEmpty({ title = 'Nothing Here', img = empty }) {
  return (
    <Container
      maxWidth='sm'
      style={{
        paddingTop: 92,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <img
        style={{
          width: '50%',
        }}
        src={img}
        alt={title}
      />
      <Typography style={{ marginBottom: 10, marginTop: 20 }} variant='h5'>
        {title}
      </Typography>
    </Container>
  );
}
