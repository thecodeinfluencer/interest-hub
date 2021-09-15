import { Checkbox, FormControlLabel } from '@material-ui/core';
// import { loadChurches } from "../store/actions/churchesActions";
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Screen from '../components/fragments/Screen';
import SelectInterests from '../components/fragments/SelectInterests';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Form from '../components/utilities/Form';
import { update } from '../store/actions/authActions';

export default function EditProfileScreen() {
  const state = useSelector(state => state);

  const {
    firstName,
    surname,
    email,
    interests: prevInterests,
    bio,
    phoneNumber,
    location: prevLocation,
  } = state.auth?.user?.firstName ? state.auth?.user : {};

  const [updateLocation, setUpdateLocation] = useState(false);
  const [location, setLocation] = useState(prevLocation);
  const [interests, setinterests] = useState(prevInterests);
  const dispatch = useDispatch();

  const error = state.auth.err;
  const busy = state.auth.busy;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  const validate = Yup.object().shape({
    firstName: Yup.string().required().label('First Name'),
    surname: Yup.string().required().label('Surname'),
    phoneNumber: Yup.string().required().label('Phone Number'),
    email: Yup.string().email().required().label('Email Address'),
    bio: Yup.string().min(20).required().label('Bio'),
  });

  return (
    <Screen
      title='Edit Profile'
      style={{
        marginTop: 16,
      }}
    >
      {updateLocation && !location && (
        <Alert style={{ marginBottom: 20 }} icon={false} severity='warning'>
          You need to enable location access to proceed
        </Alert>
      )}
      <Form
        onSubmit={vals => {
          updateLocation
            ? dispatch(update({ ...vals, location, interests }))
            : dispatch(update({ ...vals, location: prevLocation, interests }));
        }}
        validationSchema={validate}
        initialValues={{
          firstName,
          surname,
          phoneNumber,
          email,
          bio,
        }}
      >
        <Input name='firstName' placeholder={firstName} label='First Name' />
        <Input name='surname' placeholder={surname} label='Surname' />
        <Input name='phoneNumber' placeholder={phoneNumber} label='Phone' />
        <Input name='email' placeholder={email} label='Email Address' />
        <Input
          multiline
          rows={3}
          name='bio'
          placeholder={bio}
          label='About You'
        />

        <SelectInterests
          initialVals={prevInterests}
          onSelect={interests => {
            setinterests(interests);
          }}
        />

        {error && (
          <>
            <Alert className='w-100' icon={false} severity='error'>
              {error?.message}
            </Alert>
          </>
        )}
        <div className='w-100 d-flex justify-content-between align-items-center mt-2'>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={updateLocation}
                  onChange={e => setUpdateLocation(e.target.checked)}
                  color='primary'
                />
              }
              label='Also update location'
            />
          </div>
          <Button
            disabled={busy || (updateLocation && !location)}
            title='Update'
            submit
          />
        </div>
      </Form>
    </Screen>
  );
}
