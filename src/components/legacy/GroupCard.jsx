import { Grid, Typography } from '@material-ui/core';
import React from 'react';
// import image from '../../assets/food.jpg';

export default function GroupCard({ name, image }) {
  return (
    <Grid xs={6} item>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: 120,
          borderRadius: 4,
          padding: 8,
          backgroundImage: `url("${image}")`,
          backgroundColor: 'rgba(0,0,0,.7)',
          backgroundBlendMode: 'soft-light',
        }}
      >
        <Typography style={{ color: '#fff' }} variant='h6'>
          {name ? name : 'Group Name Here'}
        </Typography>
      </div>
    </Grid>
  );
}
