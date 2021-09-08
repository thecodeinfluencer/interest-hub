import { Avatar, Chip, Grid, Typography } from '@material-ui/core';
import { AddRounded, InfoOutlined } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import mapIcon from '../assets/pin0.svg';
import Screen from '../components/fragments/Screen';
import EventCard from '../components/legacy/EventCard';
import GroupChat from '../components/legacy/GroupChat';
import Button from '../components/ui/Button';
import { loadEvents } from '../store/actions/eventActions';
import {
  loadGroupMembersList,
  loadGroupMessagesList,
} from '../store/actions/groupActions';

export default function GroupRouteScreen() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const { name, interests, bio, location, photoURL, members, messages } =
    state.groups.list.filter(({ id }) => id == params.id)[0];

  const events = state.events.list;

  console.log(events);

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
    dispatch(loadGroupMembersList(params.id));
    dispatch(loadGroupMessagesList(params.id));
    dispatch(loadEvents());
  }, [params]);

  console.log(state.groups.list.filter(({ id }) => id == params.id)[0]);

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
      >
        <Typography variant='h5' style={{ color: '#fff', fontWeight: 'bold' }}>
          {name}
        </Typography>
      </div>
      <Screen style={{ marginTop: -34 }} title='Group Info'>
        <Grid item xs={12}>
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
            Group Tags
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
                {members?.map(({ uid, displayName, photoURL }) => (
                  <Avatar key={uid} alt={displayName} src={photoURL} />
                ))}
              </AvatarGroup>
            </div>
            <Button
              onClick={() => {
                history.push({
                  pathname: `/groups/${params.id}/members`,
                  state: {
                    members,
                  },
                });
              }}
              outlined
              title='Show List'
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
                  <div>Group Location</div>
                </InfoWindow>
              </Marker>
            </GoogleMap>
          )}
        </Grid>

        {messages && (
          <>
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
              {messages
                ?.slice(0, 2)
                .filter(({ reply_to }) => reply_to == false)
                .map(({ id, sender, date, message }) => (
                  <GroupChat
                    id={id}
                    key={id}
                    sender={sender}
                    time={moment(date).fromNow()}
                    content={message}
                    replies={messages.filter(({ reply_to }) => reply_to == id)}
                    preview
                  />
                ))}
              <div className='d-flex justify-content-between'>
                <div />
                <Button
                  onClick={() => {
                    history.push(`/groups/${params.id}/chats`);
                  }}
                  outlined
                  title='More Chats'
                  size='small'
                />
              </div>
            </Grid>
          </>
        )}

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
        {events.map(({ id, name, date, photoURL, venue }) => (
          <EventCard
            image={photoURL}
            event={name}
            venue={venue}
            date={moment(parseInt(date)).format('LL')}
            key={id}
            link={`/groups/${params.id}/events/${id}`}
          />
        ))}
      </Screen>
    </>
  );
}
