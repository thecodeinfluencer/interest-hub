import { Avatar, Grid, Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import mapIcon from '../assets/pin0.svg';
import Screen from '../components/fragments/Screen';
import Button from '../components/ui/Button';

export default function EventRouteScreen() {
  const [attending, setAttending] = useState(3);
  const state = useSelector(state => state);
  const history = useHistory();
  const { location } = state.auth?.user?.firstName ? state.auth?.user : {};

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
      ></div>
      <Screen style={{ marginTop: -34 }} title='Event Info'>
        <Grid item xs={12}>
          <Typography variant='h5' style={{ fontWeight: 'bold' }}>
            The Nyeri Fest
          </Typography>
          <Typography variant='h6' style={{ fontWeight: 'bold' }}>
            Wed 26 Oct, 2021
          </Typography>
          <Typography
            variant='h6'
            style={{ fontWeight: 'bold', marginBottom: 14 }}
          >
            2259 HRS
          </Typography>
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
            Location Guide
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
            Attending
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
                history.push('/groups/group1234/events/event1234/people');
              }}
              outlined
              title='More people'
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
            Are you attending?
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <div className='d-flex justify-content-betwee'>
            <Button
              onClick={() => {
                setAttending(1);
              }}
              className='me-2'
              outlined={attending != 1}
              title='Yes'
              size='small'
            />
            <Button
              onClick={() => {
                setAttending(0);
              }}
              className='me-2'
              outlined={attending != 0}
              title='No'
              size='small'
            />
            <Button
              onClick={() => {
                setAttending(2);
              }}
              outlined={attending != 2}
              title='Maybe'
              size='small'
            />
          </div>
        </Grid>
      </Screen>
    </>
  );
}
