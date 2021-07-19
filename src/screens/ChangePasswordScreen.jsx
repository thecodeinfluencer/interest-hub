import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import * as Yup from 'yup';

import Screen from '../components/fragments/Screen';
import Button from '../components/ui/Button';
import Form from '../components/utilities/Form';
import Input from '../components/ui/Input';
// import KanisaActionCard from "../components/legacy/KanisaActionCard";
// import { bookService } from "../store/actions/servicesActions";
import Alert from '@material-ui/lab/Alert';
import { updateCredentials } from '../store/actions/authActions';

const validate = Yup.object().shape({
  password: Yup.string().required().min(6).label('Password'),
  current_password: Yup.string().required().label('Current Password'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

export default function ChangePasswordScreen({ match }) {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const error = state.auth.err;
  const info = state.auth.info;
  const busy = state.auth.busy;

  return (
    <Screen title='Change Password'>
      <Grid item xs={12}>
        <div
          style={{
            display: 'flex',
            // alignItems: "center",
            flexDirection: 'column',
          }}
        >
          <Form
            validationSchema={validate}
            onSubmit={vals => {
              dispatch(updateCredentials(vals));
              console.log(vals);
            }}
            initialValues={{
              password: '',
              current_password: '',
              password_confirmation: '',
            }}
          >
            <Input
              type='password'
              placeholder='Current Password'
              name='current_password'
            />
            <Input type='password' placeholder='New Password' name='password' />
            <Input
              type='password'
              placeholder='Confirm New Password'
              name='password_confirmation'
            />
            {error?.message && (
              <>
                <Alert icon={false} severity='error'>
                  {error?.message}
                </Alert>
                <br />
              </>
            )}
            {error?.errors && (
              <>
                <Alert icon={false} severity='error'>
                  {error?.errors?.current_password}
                </Alert>
                <br />
              </>
            )}
            {info && (
              <>
                <Alert icon={false} severity='info'>
                  {info?.message}
                </Alert>
                <br />
              </>
            )}
            <Button disabled={busy} title='Change Password' submit />
          </Form>
        </div>
      </Grid>
    </Screen>
  );
}
