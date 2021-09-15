import { Avatar, Chip, Grid, Typography } from '@material-ui/core';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../components/fragments/Screen';
import GroupCard from '../components/legacy/GroupCard';
import Button from '../components/ui/Button';
import { loadUserData, logout } from '../store/actions/authActions';
// import { groups } from '../store/local/contents';

import mapIcon from '../assets/pin0.svg';
import mapIcon2 from '../assets/pin1.svg';
import { useHistory } from 'react-router';
import { removeDuplicates } from '../methods';
import { loadGroupMembersList } from '../store/actions/groupActions';
import { loadEventAttendeesList } from '../store/actions/eventActions';
import EventCard from '../components/legacy/EventCard';

function ProfileScreen() {
  // const [map, setMap] = useState(null);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const people = state.people.list;
  const groups = removeDuplicates(state.groups.list, item => item.id);
  const events = removeDuplicates(state.events.list, item => item.id);
  const { uid, bio, firstName, surname, email, location, photoURL, interests } =
    state.auth?.user?.firstName ? state.auth?.user : {};

  const [selectedLocation, setSelectedLocation] = useState(location);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  const onUnmount = React.useCallback(function callback() {}, []);

  useEffect(() => {
    dispatch(loadUserData());
    groups.map(({ id }) => dispatch(loadGroupMembersList(id)));
    events.map(({ id }) => dispatch(loadEventAttendeesList(id)));
  }, [dispatch]);

  console.log(events);

  return (
    <Screen title='Profile'>
      <Grid xs={12} item>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
          <Avatar
            src={photoURL}
            style={{
              width: 80,
              height: 80,
              marginRight: 20,
            }}
          ></Avatar>
          <div>
            <Typography style={{ lineHeight: 1 }} variant='h6'>
              {firstName + ' ' + surname}
            </Typography>
            <Typography variant='body1'>{email}</Typography>
            <div style={{ display: 'flex' }}>
              <Button
                onClick={() => {
                  history.push('/profile/edit');
                }}
                style={{ marginRight: 10 }}
                title='Edit'
              />
              <Button
                outlined
                title='Logout'
                onClick={() => dispatch(logout())}
              />
            </div>
          </div>
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
          About You
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography>
          {bio || 'Update your profile for people to see your bio.'}
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
        >
          Groups
        </Typography>
      </Grid>

      {groups
        .filter(
          ({ members }) =>
            members?.filter(({ uid: uid2 }) => uid2 == uid).length > 0
        )
        .map(({ id, name, photoURL }) => (
          <GroupCard key={id} image={photoURL} name={name} link={id} />
        ))}

      <Grid xs={12} item>
        <Typography
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
          variant='h6'
        >
          Events
        </Typography>
      </Grid>
      {events
        .filter(
          ({ attendees }) =>
            attendees?.filter(({ uid: uid2 }) => uid2 == uid).length > 0
        )
        .map(event => (
          <EventCard
            event={event}
            key={event.id}
            link={`/groups/${event.group}/events/${event.id}`}
          />
        ))}

      <Grid xs={12} item>
        <Typography
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
          variant='h6'
        >
          Map
        </Typography>
      </Grid>

      <Grid xs={12} item>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: 400, borderRadius: 4 }}
            center={{
              lat: parseFloat(location?.latitude),
              lng: parseFloat(location?.longitude),
            }}
            zoom={18}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              icon={mapIcon2}
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
                <div>Your Location</div>
              </InfoWindow>
            </Marker>
            {people.map(({ location: mapLocation, firstName, surname }) => {
              return (
                <Marker
                  key={`${Math.random() * 1000}`}
                  icon={mapIcon}
                  position={{
                    lat: parseFloat(mapLocation?.latitude),
                    lng: parseFloat(mapLocation?.longitude),
                  }}
                  onClick={() => {
                    setSelectedLocation(mapLocation);
                  }}
                >
                  {selectedLocation === mapLocation && (
                    <InfoWindow
                      position={{
                        lat: parseFloat(selectedLocation?.latitude),
                        lng: parseFloat(selectedLocation?.longitude),
                      }}
                    >
                      <div>
                        {firstName} {surname}
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
          </GoogleMap>
        )}
      </Grid>
    </Screen>
  );
}

export default React.memo(ProfileScreen);
