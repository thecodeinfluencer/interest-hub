import { Avatar, Grid, Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import mapIcon from '../assets/pin0.svg';
import Screen from '../components/fragments/Screen';
import Button from '../components/ui/Button';
import { loadEventAttendeesList } from '../store/actions/eventActions';

export default function EventRouteScreen() {
  const [attending, setAttending] = useState(3);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const { name, bio, location, photoURL, date, attendees } =
    state.events.list.filter(({ id }) => id == params.eventId)[0];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds);
    map.fitBounds(bounds);
  }, []);

  useEffect(() => {
    dispatch(loadEventAttendeesList(params.eventId));
  }, [params.eventId]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${photoURL})`,
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
            {name}
          </Typography>
          <Typography variant='h6' style={{ fontWeight: 'bold' }}>
            {moment(parseInt(date)).format('ddd')}{' '}
            {moment(parseInt(date)).format('LL')}
          </Typography>
          <Typography
            variant='h6'
            style={{ fontWeight: 'bold', marginBottom: 14 }}
          >
            {moment(parseInt(date)).format('LT')}
          </Typography>
          <Typography color='textSecondary'>
            <InfoOutlined className='me-2' />
            {bio}
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
                {attendees?.map(({ uid, displayName, photoURL }) => (
                  <Avatar key={uid} alt={displayName} src={photoURL} />
                ))}
              </AvatarGroup>
            </div>
            <Button
              onClick={() => {
                history.push({
                  pathname: `/groups/${params.id}/events/${params.eventId}/people`,
                  state: {
                    attendees,
                  },
                });
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
