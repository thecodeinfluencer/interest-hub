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
import { groups } from '../store/local/contents';

import mapIcon from '../assets/pin0.svg';
import mapIcon2 from '../assets/pin1.svg';

function ProfileScreen() {
  // const [map, setMap] = useState(null);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const people = state.people.list;
  const { firstName, surname, email, location, photoURL, interests } = state
    .auth?.user?.firstName
    ? state.auth?.user
    : {};

  const [selectedLocation, setSelectedLocation] = useState(location);

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

  const onUnmount = React.useCallback(function callback() {
    // setMap(null);
  }, []);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  return (
    <Screen title='Profile'>
      <Grid xs={12} item>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
          <Avatar
            src={
              photoURL
                ? photoURL
                : `https://ui-avatars.com/api/?name=${firstName}+${surname}`
            }
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
              <Button style={{ marginRight: 10 }} title='Edit' />
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

      {/* {[1, 2, 3, 4, 5, 6].map(() => (
        <GroupCard key={`${Math.random() * 1000}`} />
      ))} */}

      {groups.map(({ name }) => (
        <GroupCard
          image={`https://picsum.photos/id/${Math.floor(
            Math.random() * 200
          )}/200/300`}
          name={name}
          key={`${Math.random() * 1000}`}
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
              console.log('maplctn: ', firstName);
              console.log('maplctn: ', mapLocation);
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
