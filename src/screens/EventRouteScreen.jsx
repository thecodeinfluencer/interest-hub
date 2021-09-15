import { Avatar, Grid, Typography } from '@material-ui/core';
import { CreateRounded, InfoOutlined } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import mapIcon from '../assets/pin0.svg';
import Screen from '../components/fragments/Screen';
import Button from '../components/ui/Button';
import {
  addAttendeeToEvent,
  loadEventAttendeesList,
  loadEvents,
  removeAttendeeFromEvent,
} from '../store/actions/eventActions';

export default function EventRouteScreen() {
  const state = useSelector(state => state);
  const user = state.auth.user;

  const [attending, setAttending] = useState(3);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const { name, bio, location, photoURL, date, time, attendees } =
    state.events.list.filter(({ id }) => id == params.eventId)[0];

  const { members } = state.groups.list.filter(({ id }) => id == params.id)[0];

  const isAdmin = Boolean(members?.filter(mb => mb.uid == user.uid)[0]?.admin);

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
    dispatch(loadEvents());
    dispatch(loadEventAttendeesList(params.eventId));

    if (attendees?.filter(at => at.uid == user.uid).length > 0) {
      attendees?.filter(at => at.uid == user.uid)[0]?.surety == 'yes'
        ? setAttending(1)
        : setAttending(2);
    }
  }, [dispatch, params.eventId]);

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
            {moment(date).format('dddd MMMM DD, YYYY')}
          </Typography>
          <Typography
            variant='h6'
            style={{ fontWeight: 'bold', marginBottom: 14 }}
          >
            {time}
          </Typography>
          <Typography color='textSecondary'>
            <InfoOutlined className='me-2' />
            {bio}
          </Typography>
        </Grid>

        {isAdmin && (
          <Grid xs={12} item>
            <div
              className='d-flex align-items-center justify-content-between'
              style={{
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Typography variant='h6' noWrap={true}>
                Admin
              </Typography>
              {isAdmin && (
                <Button
                  startIcon={<CreateRounded />}
                  variant='outlined'
                  size='small'
                  title='Edit Event'
                  onClick={() => {
                    history.push(
                      `/groups/${params.id}/events/${params.eventId}/edit`
                    );
                  }}
                />
              )}
            </div>
          </Grid>
        )}

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
              ></Marker>
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
                dispatch(addAttendeeToEvent(params.eventId, user?.uid, 'yes'));
              }}
              className='me-2'
              outlined={attending != 1}
              title='Yes'
              size='small'
            />
            <Button
              onClick={() => {
                setAttending(0);
                dispatch(removeAttendeeFromEvent(params.eventId, user?.uid));
              }}
              className='me-2'
              outlined={attending != 0}
              title='No'
              size='small'
            />
            <Button
              onClick={() => {
                setAttending(2);
                dispatch(
                  addAttendeeToEvent(params.eventId, user?.uid, 'maybe')
                );
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
