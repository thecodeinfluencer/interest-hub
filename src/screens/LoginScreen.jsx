import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Form from '../components/utilities/Form';
import { login } from '../store/actions/authActions';

import image from '../assets/welcome.svg';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state => state);
  const error = state.auth.err;
  const busy = state.auth.busy;

  const validate = Yup.object().shape({
    email: Yup.string().required().email().label('Email Address'),
    password: Yup.string().min(6).required().label('Password'),
  });

  const goToResetPassword = () => {
    history.push('/reset-password');
  };

  useEffect(() => {
    const auth = state.auth.user;

    if (JSON.stringify(auth) !== '{}') {
      history.push('/');
    }
  });

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
      <Form
        onSubmit={vals => dispatch(login(vals))}
        validationSchema={validate}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        <Input name='email' placeholder='Email Address' />
        <Input type='password' name='password' placeholder='Password' />
        <Typography onClick={goToResetPassword} color='primary'>
          Forgot Password?
        </Typography>
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
          <Typography onClick={() => history.push('/register')} color='primary'>
            Create account
          </Typography>
          <Button disabled={busy} title='Log In' submit />
        </div>
      </Form>
    </Container>
  );
}
