import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Screen from '../components/fragments/Screen';
import { aboutActions } from '../store/local/contents';
import CardHome from '../components/legacy/CardHome';
import { HomeOutlined } from '@material-ui/icons';

export default function AboutKanisa() {
  return (
    <Screen title='About Kanisa'>
      <Grid item xs={12}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Avatar
            style={{
              marginBottom: 10,
              width: 70,
              height: 70,
            }}
          >
            <HomeOutlined fontSize={'large'} />
          </Avatar>
          <Typography variant='h5'>Kanisa</Typography>
          <Typography
            style={{
              marginBottom: 10,
            }}
          >
            Current Version: 1.0.0
          </Typography>
          <Typography variant='body1'>
            Kanisa provides you with an easy and convenient way to connect with
            your church and access Church activities under one roof.
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        {aboutActions.map(({ icon, name, link, full, desc }) => {
          return (
            <CardHome
              key={`${name}`}
              icon={icon}
              title={name}
              link={link}
              full={full}
              desc={desc}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
