import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import * as Yup from 'yup';
import Screen from '../components/fragments/Screen';
import SearchInput from '../components/fragments/SearchInput';
import SelectInterests from '../components/fragments/SelectInterests';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Form from '../components/utilities/Form';
import { deleteEvent, updateEvent } from '../store/actions/eventActions';
import cities2 from '../store/local/worldcities.json';

export default function EditEventScreen() {
  const state = useSelector(state => state);

  const params = useParams();

  const {
    name,
    bio,
    location: prevLocation,
    date,
    time,
    city: prevCity,
    interests: prevInterests,
  } = state.events.list.filter(({ id }) => id == params.eventId)[0];

  const [localErr, setLocalErr] = useState(state.events.err);
  const [city, setCity] = useState(prevCity);
  const [location, setLocation] = useState(prevLocation);
  const [interests, setInterests] = useState(prevInterests);

  const history = useHistory();
  const dispatch = useDispatch();
  const error = state.events.err || localErr;
  const busy = state.events.busy;

  const validate = Yup.object().shape({
    name: Yup.string().required().label('Event Name'),
    bio: Yup.string().min(25).required().label('Event Bio'),
    date: Yup.string().required().label('Event Date'),
    time: Yup.string().required().label('Event Time'),
  });

  return (
    <Screen
      style={{
        marginTop: 16,
      }}
      title='Edit Event'
    >
      <Form
        onSubmit={(vals, { resetForm }) => {
          //   if (!vals.image.length) {
          //     setLocalErr({ message: 'Select an image' });
          //     return;
          //   }

          if (interests.length < 2) {
            setLocalErr({ message: 'Select at least two tags' });
            return;
          }

          if (!location) {
            setLocalErr({ message: 'Select a nearest place to continue' });
            return;
          }

          setLocalErr(null);

          dispatch(
            updateEvent({ ...vals, location, interests, city }, params.eventId)
          );

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
          name: name,
          bio: bio,
          date: date,
          time: time,
        }}
      >
        {/* <div>{params.eventId}</div> */}
        <Input name='name' placeholder='Event Name' />
        <Input type='date' name='date' placeholder='Event Date' />
        <Input type='time' name='time' placeholder='Event Time' />
        <Input multiline rows={3} name='bio' placeholder='Event Bio' />

        <SearchInput
          data={cities2}
          prevValue={`${city.city}, ${city.country}`}
          onSelect={city => {
            setCity(city);
            setLocation({
              latitude: city?.lat,
              longitude: city?.lng,
            });
          }}
        />

        {/* <ImageUpload
          limit={1}
          name='image'
          variant='rounded'
          placeholder={photoURL}
        /> */}

        <SelectInterests
          title='Select Event Tags'
          initialVals={prevInterests}
          onSelect={interests => {
            setInterests(interests);
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
          <div className='d-flex align-items-center'>
            <Button
              className='me-2'
              variant='outlined'
              disabled={busy}
              title='Delete'
              onClick={() => {
                let confirmDelete = confirm(`Delete group '${name}'`);

                if (confirmDelete) {
                  dispatch(deleteEvent(params.eventId));
                  setTimeout(() => {
                    if (!error) {
                      history.entries = [];
                      history.index = -1;
                      history.push(`/groups`);
                    }
                  }, 1000);
                }
              }}
            />
            <Button disabled={busy} title='Update' submit />
          </div>
        </div>
      </Form>
    </Screen>
  );
}
