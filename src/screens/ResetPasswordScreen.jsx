import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Form from '../components/utilities/Form';

import Screen from '../components/fragments/Screen';
import Alert from '@material-ui/lab/Alert';

const validate = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

export default function ResetPasswordScreen() {
  const history = useHistory();
  const state = useSelector(state => state);
  const error = state.auth.err;
  const busy = state.auth.busy;

  return (
    <Screen authPass title='Forgot Password'>
      <Grid item xs={12}>
        <Form
          validationSchema={validate}
          onSubmit={vals => {
            // requestResetCode(vals);
            console.log(vals);
          }}
          initialValues={{
            email: '',
          }}
        >
          <Input name='email' placeholder='Email Address' />
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
            <div>
              <Typography>Don&apos;t need to reset? </Typography>
              <Typography onClick={() => history.push('/auth')} color='primary'>
                Log In
              </Typography>
            </div>
            <Button disabled={busy} title='Send' submit />
          </div>
          <br />
        </Form>
      </Grid>
    </Screen>
  );
}
