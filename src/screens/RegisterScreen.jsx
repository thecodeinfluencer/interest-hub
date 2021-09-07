import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Form from '../components/utilities/Form';
import { register } from '../store/actions/authActions';
// import { loadChurches } from "../store/actions/churchesActions";
import Alert from '@material-ui/lab/Alert';

import image from '../assets/welcome.svg';
import SelectInterests from '../components/fragments/SelectInterests';

export default function RegisterScreen() {
  const [accept, setAccept] = useState(false);
  const [location, setLocation] = useState(null);
  const [interests, setinterests] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const error = state.auth.err;
  const busy = state.auth.busy;
  const justRegistered = state.auth.justRegistered;

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

    const auth = state.auth.user;
    if (JSON.stringify(auth) !== '{}') {
      history.push('/');
    }
  }, [history, state.auth.user]);

  const validate = Yup.object().shape({
    firstName: Yup.string().required().label('First Name'),
    surname: Yup.string().required().label('Surname'),
    gender: Yup.string().required().label('Gender'),
    dob: Yup.string().required().label('Date of Birth'),
    phoneNumber: Yup.string().required().label('Phone Number'),
    email: Yup.string().email().required().label('Email Address'),
    bio: Yup.string().min(20).required().label('Bio'),
    password: Yup.string().required().label('Password'),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });

  const gender = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Prefer not to say', value: 'not_say' },
  ];

  return (
    <Container
      style={{
        paddingBottom: 36,
      }}
      maxWidth='sm'
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <img
          src={image}
          style={{
            margin: 40,
            width: 200,
          }}
          alt=''
        />
      </div>
      {!location && (
        <Alert style={{ marginBottom: 20 }} icon={false} severity='warning'>
          You need to enable location access to proceed
        </Alert>
      )}
      <Form
        onSubmit={vals => {
          // console.log({ ...vals, interests });
          dispatch(register({ ...vals, location, interests }));
        }}
        validationSchema={validate}
        initialValues={{
          firstName: '',
          surname: '',
          gender: '',
          dob: '',
          phoneNumber: '',
          email: '',
          bio: '',
          password: '',
          password_confirmation: '',
        }}
      >
        <Input name='firstName' placeholder='First Name' />
        <Input name='surname' placeholder='Surname' />
        <Select name='gender' placeholder='Gender' data={gender} />
        <Input type='date' name='dob' placeholder='DOB' />
        <Input name='phoneNumber' placeholder='Phone Number' />
        <Input name='email' placeholder='Email Address' />
        <Input multiline rows={3} name='bio' placeholder='About You' />
        <Input type='password' name='password' placeholder='Password' />
        <Input
          type='password'
          name='password_confirmation'
          placeholder='Confirm Password'
        />
        <SelectInterests
          onSelect={interests => {
            // console.log(interests);
            setinterests(interests);
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={accept}
              onChange={e => setAccept(e.target.checked)}
              // name="Accept Privacy"
              color='primary'
            />
          }
          label='Accept Terms &amp; Conditions and Privacy Policy'
        />
        <br />
        <br />
        {error && (
          <>
            <Alert icon={false} severity='error'>
              {error?.message}
            </Alert>
            <br />
          </>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {justRegistered ? (
            <Typography>Registration Successful</Typography>
          ) : (
            <div>
              <Typography>Already have an account?</Typography>
              <Typography
                onClick={() => {
                  history.push('/login');
                }}
                color='primary'
              >
                Log In
              </Typography>
            </div>
          )}

          {justRegistered ? (
            <Button
              onClick={() => {
                history.push('/login');
              }}
              variant='outlined'
              title='Login'
            />
          ) : (
            <Button
              disabled={busy || !location || !accept}
              title='Register'
              submit
            />
          )}
        </div>
      </Form>
    </Container>
  );
}
