import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import Button from '../components/ui/Button';
import colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';

import image from '../assets/welcome.svg';

export default function WelcomeScreen() {
  const history = useHistory();
  const state = useSelector(state => state);
  const user = state.auth.user;

  useEffect(() => {
    if (JSON.stringify(user) !== '{}') {
      history.push('/');
    }
  }, [history, user]);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // alignItems: "center",
        height: Dimensions.appHeight,
        padding: 30,
        backgroundColor: colors.white,
        paddingTop: 36,
      }}
    >
      <div>
        <Typography variant='h4'>
          Welcome to <br /> <b>Interest Hub</b>
        </Typography>
        <Typography variant='h6'>
          Connecting you to individuals who share your interest.
        </Typography>
      </div>

      <img src={image} alt='' />

      <div>
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            marginBottom: 16,
          }}
        >
          <Button
            title='Log In'
            style={{
              marginRight: 10,
            }}
            onClick={() => history.push('/login')}
          />
          <Button
            title='Register'
            outlined
            onClick={() => history.push('/register')}
          />
        </div>
      </div>
    </div>
  );
}
