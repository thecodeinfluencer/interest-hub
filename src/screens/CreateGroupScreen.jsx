import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import Screen from '../components/fragments/Screen';
import SelectInterests from '../components/fragments/SelectInterests';
import Button from '../components/ui/Button';
import ImageUpload from '../components/ui/ImageUpload';
import Input from '../components/ui/Input';
import Form from '../components/utilities/Form';
import { register } from '../store/actions/authActions';

export default function CreateGroupScreen() {
  const [location, setLocation] = useState(null);
  const [interests, setinterests] = useState([]);

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
    name: Yup.string().required().label('Group Name'),
    bio: Yup.string().min(25).required().label('Group Bio'),
    image: Yup.string().required().label('Group Image'),
  });

  return (
    <Screen
      style={{
        marginTop: 16,
      }}
      title='Create Group'
    >
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
          name: '',
          bio: '',
          image: '',
        }}
      >
        <Input name='name' placeholder='Group Name' />
        <Input multiline rows={3} name='bio' placeholder='Group Bio' />

        <ImageUpload limit={1} name='image' variant='rounded' />

        <SelectInterests
          title='Select Group Tags'
          onSelect={interests => {
            setinterests(interests);
          }}
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

        <div className='d-flex justify-content-between align-items-center w-100'>
          <div></div>
          <Button disabled={busy || !location} title='Create' submit />
        </div>
      </Form>
    </Screen>
  );
}
