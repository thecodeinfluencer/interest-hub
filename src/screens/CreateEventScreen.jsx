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
import { createEvent } from '../store/actions/eventActions';

export default function CreateEventScreen() {
  const state = useSelector(state => state);

  const [localErr, setLocalErr] = useState(state.groups.err);
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [interests, setInterests] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const error = state.events.err;
  const busy = state.events.busy;

  useEffect(() => {}, [history, state.auth.user]);

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
      <Form
        onSubmit={(vals, { resetForm }) => {
          if (!vals.image.length) {
            setLocalErr({ message: 'Select an image' });
            return;
          }

          if (interests.length < 2) {
            setLocalErr({ message: 'Select at least two tags' });
            return;
          }

          setLocalErr(null);
          dispatch(createEvent({ ...vals, interests }));

          setTimeout(() => {
            if (!error) {
              resetForm();
              setInterests([]);
              history.goBack();
            }
          }, 1000);
        }}
        validationSchema={validate}
        initialValues={{
          name: '',
          bio: '',
          date: '',
          time: '',
          image: [],
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
          <Button disabled={busy} title='Create' submit />
        </div>
      </Form>
    </Screen>
  );
}
