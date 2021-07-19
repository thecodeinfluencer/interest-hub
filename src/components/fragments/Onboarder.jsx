import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Button from '../ui/Button';

export default function Onboarder({ title, desc, img, final, start }) {
  return (
    <Container
      maxWidth='sm'
      style={{
        paddingTop: 72,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <img
        style={{
          width: start ? '50%' : '70%',
        }}
        src={img}
        alt={title}
      />
      <Typography style={{ marginBottom: 10, marginTop: 20 }} variant='h4'>
        {title}
      </Typography>
      <Typography variant='h5'>{desc}</Typography>
      {final && (
        <Button
          style={{ marginTop: 30 }}
          variant='outlined'
          title='Get Started'
        />
      )}
    </Container>
  );
}
