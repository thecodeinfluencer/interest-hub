import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import * as Yup from 'yup';

import Screen from '../components/fragments/Screen';
import Button from '../components/ui/Button';
import Form from '../components/utilities/Form';
// import KanisaActionCard from "../components/legacy/KanisaActionCard";
// import { bookService } from "../store/actions/servicesActions";
import Alert from '@material-ui/lab/Alert';
import ProfileImageUpload from '../components/ui/ProfileImageUpload';
// import { changeAvatar } from "../store/actions/authActions";

const validate = Yup.object().shape({
  image: Yup.mixed().required().label('Profile Image'),
});

export default function ChangeAvatarScreen({ match }) {
  const state = useSelector(state => state);
  const user = state.auth.user;
  const error = state.auth.err;
  const info = state.auth.info;
  const busy = state.auth.busy;

  return (
    <Screen title='Change Avatar'>
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
              // const blob = new Blob([JSON.stringify(vals.image[1], null, 2)], {
              //   type: "application/json",
              // });
              // const imgObj = { image: blob };
              // console.log(new Blob(vals.image[1]));
              // dispatch(changeAvatar(imgObj));
            }}
            initialValues={{
              image: '',
            }}
          >
            <ProfileImageUpload
              name='image'
              alt={user.firstName}
              placeholder={user.links.avatar}
              label='Upload Kanisa Profile Pic'
            />
            {error?.message && (
              <>
                <Alert icon={false} severity='error'>
                  {error?.message}
                </Alert>
                <br />
              </>
            )}
            {info?.message && (
              <>
                <Alert icon={false} severity='info'>
                  {info?.message}
                </Alert>
                <br />
              </>
            )}
            <Button disabled={busy} title='Change Profile Pic' submit />
          </Form>
        </div>
      </Grid>
    </Screen>
  );
}
