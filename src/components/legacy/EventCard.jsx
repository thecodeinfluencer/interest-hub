import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
// import image from '../../assets/food.jpg';

export default function EventCard({ event, image, link, venue, date }) {
  const history = useHistory();
  return (
    <Grid xs={6} item>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: 100,
          borderRadius: 4,
          padding: 8,
          backgroundImage: `url("${image}")`,
          backgroundColor: 'rgba(0,0,0,.7)',
          backgroundBlendMode: 'soft-light',
        }}
        onClick={() => {
          link && history.push(link);
        }}
      ></div>
      <div className='my-1 mx-1'>
        <Typography variant='body1'>{event}</Typography>
        <Typography variant='body2'>{venue}</Typography>
        <Typography color='textSecondary' variant='body2'>
          {date}
        </Typography>
      </div>
    </Grid>
  );
}
