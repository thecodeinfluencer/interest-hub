import { Avatar, Chip, Grid, Typography } from '@material-ui/core';
import { AddRounded, InfoOutlined } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import mapIcon from '../assets/pin0.svg';
import Screen from '../components/fragments/Screen';
import EventCard from '../components/legacy/EventCard';
import GroupChat from '../components/legacy/GroupChat';
import Button from '../components/ui/Button';

export default function GroupRouteScreen() {
  const state = useSelector(state => state);
  const history = useHistory();
  const { location, interests } = state.auth?.user?.firstName
    ? state.auth?.user
    : {};

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds);
    map.fitBounds(bounds);
    // setMap(map);
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${'https://picsum.photos/id/324/300'})`,
          backgroundSize: 'cover',
          backgroundColor: 'rgba(0,0,0,.7)',
          backgroundBlendMode: 'soft-light',
          marginTop: 56,
          height: 200,
          display: 'flex',
          alignItems: 'flex-end',
          padding: 16,
        }}
        className='w-100'
      >
        <Typography variant='h5' style={{ color: '#fff', fontWeight: 'bold' }}>
          Group Name
        </Typography>
      </div>
      <Screen style={{ marginTop: -34 }} title='Group Info'>
        <Grid item xs={12}>
          <Typography color='textSecondary'>
            <InfoOutlined className='me-2' />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. At,
            magnam. Delectus pariatur voluptatum provident, dolore nam explicabo
            molestiae amet? Libero.
          </Typography>
        </Grid>

        <Grid xs={12} item>
          <Typography
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
            variant='h6'
            noWrap={true}
          >
            Interests
          </Typography>
        </Grid>
        <Grid xs={12} item>
          {interests &&
            interests.map(interest => (
              <Chip
                key={`${Math.random() * 1000}`}
                style={{
                  marginRight: 6,
                  marginBottom: 8,
                }}
                label={interest}
                variant='outlined'
                color='primary'
              />
            ))}
        </Grid>

        <Grid xs={12} item>
          <Typography
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
            variant='h6'
            noWrap={true}
          >
            Members
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <div className='d-flex justify-content-between'>
            <div>
              <AvatarGroup max={4}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                <Avatar alt='Agnes Walker' src='/static/images/avatar/4.jpg' />
                <Avatar
                  alt='Trevor Henderson'
                  src='/static/images/avatar/5.jpg'
                />
              </AvatarGroup>
            </div>
            <Button
              onClick={() => {
                history.push('/groups/group1234/members');
              }}
              outlined
              title='More Members'
              size='small'
            />
          </div>
        </Grid>

        <Grid xs={12} item>
          <Typography
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
            variant='h6'
            noWrap={true}
          >
            Location
          </Typography>
        </Grid>
        <Grid xs={12} item>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: 200,
                borderRadius: 4,
              }}
              center={{
                lat: parseFloat(location?.latitude),
                lng: parseFloat(location?.longitude),
              }}
              zoom={18}
              onLoad={onLoad}
              onUnmount={null}
            >
              <Marker
                icon={mapIcon}
                position={{
                  lat: parseFloat(location?.latitude),
                  lng: parseFloat(location?.longitude),
                }}
                zIndex={2}
              >
                <InfoWindow
                  position={{
                    lat: parseFloat(location?.latitude),
                    lng: parseFloat(location?.longitude),
                  }}
                >
                  <div>Event Location</div>
                </InfoWindow>
              </Marker>
            </GoogleMap>
          )}
        </Grid>

        <Grid xs={12} item>
          <Typography
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
            variant='h6'
            noWrap={true}
          >
            Chats
          </Typography>
        </Grid>
        <Grid xs={12} item>
          {interests &&
            [1, 2].map(() => (
              <GroupChat
                key={`${Math.random() * 1000}`}
                name='Mark Aloo'
                time='2 days ago'
                content='lorem ipsum dolor sit amet constrecteur'
                preview
              />
            ))}
          <div className='d-flex justify-content-between'>
            <div />
            <Button
              onClick={() => {
                history.push('/groups/group1234/chats');
              }}
              outlined
              title='More Chats'
              size='small'
            />
          </div>
        </Grid>

        <Grid xs={12} item>
          <div
            className='d-flex align-items-center justify-content-between'
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Typography variant='h6' noWrap={true}>
              Events
            </Typography>
            <Button
              startIcon={<AddRounded />}
              variant='outlined'
              size='small'
              title='Create Event'
              onClick={() => {
                history.push('/create/event');
              }}
            />
          </div>
        </Grid>
        {[1, 2, 3, 4].map(() => (
          <EventCard
            image={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/200/300`}
            event='Nyeri Drag Race'
            venue='Nyeri Sports Ground'
            date='26th Nov 2021'
            time='1030'
            key={`${Math.random() * 1000}`}
            link='1234567'
          />
        ))}
      </Screen>
    </>
  );
}
