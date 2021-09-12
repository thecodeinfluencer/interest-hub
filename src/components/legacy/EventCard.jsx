import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
// import image from '../../assets/food.jpg';

export default function EventCard({ event, link }) {
  const history = useHistory();
  const { name, photoURL, date, city } = event;

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
          backgroundImage: `url("${photoURL}")`,
          backgroundSize: 'cover',
          backgroundColor: 'rgba(0,0,0,.7)',
          backgroundBlendMode: 'soft-light',
        }}
        onClick={() => {
          link && history.push(link);
        }}
      ></div>
      <div className='my-1 mx-1'>
        <Typography variant='body1'>{name}</Typography>
        <Typography variant='body2'>{city?.city}</Typography>
        <Typography color='textSecondary' variant='body2'>
          {moment(date).format('dddd, MMMM DD')}
        </Typography>
      </div>
    </Grid>
  );
}
