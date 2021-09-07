import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import Screen from '../components/fragments/Screen';
import Button from '../components/ui/Button';
import ImageUpload from '../components/ui/ImageUpload';
import Input from '../components/ui/Input';
import Form from '../components/utilities/Form';
import { register } from '../store/actions/authActions';

export default function CreateEventScreen() {
  const [location, setLocation] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
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
  }, [history, state.auth.user]);

  const validate = Yup.object().shape({
    name: Yup.string().required().label('Event Name'),
    bio: Yup.string().min(25).required().label('Event Bio'),
    date: Yup.string().required().label('Event Date'),
    time: Yup.string().required().label('Event Time'),
    image: Yup.string().required().label('Event Image'),
  });

  return (
    <Screen
      style={{
        marginTop: 16,
      }}
      title='Create Event'
    >
      {!location && (
        <Alert style={{ marginBottom: 20 }} icon={false} severity='warning'>
          You need to enable location access to proceed
        </Alert>
      )}
      <Form
        onSubmit={vals => {
          // console.log({ ...vals, interests });
          dispatch(register({ ...vals, location }));
        }}
        validationSchema={validate}
        initialValues={{
          name: '',
          bio: '',
          date: '',
          time: '',
          image: '',
        }}
      >
        <Input name='name' placeholder='Event Name' />
        <Input type='date' name='date' placeholder='Event Date' />
        <Input type='time' name='time' placeholder='Event Time' />
        <Input multiline rows={3} name='bio' placeholder='Event Bio' />

        <ImageUpload limit={1} name='image' variant='rounded' />

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

        <div className='d-flex justify-content-between align-items-center w-100'>
          <div></div>
          <Button disabled={busy || !location} title='Create' submit />
        </div>
      </Form>
    </Screen>
  );
}
