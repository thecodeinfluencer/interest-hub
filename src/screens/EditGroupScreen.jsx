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
import { deleteGroup, updateGroup } from '../store/actions/groupActions';
import cities2 from '../store/local/worldcities.json';

export default function EditGroupScreen() {
  const state = useSelector(state => state);

  const params = useParams();

  const {
    name,
    interests: prevInterests,
    bio,
    location: prevLocaion,

    city: prevCity,
  } = state.groups.list.filter(({ id }) => id == params.id)[0];

  const [location, setLocation] = useState(prevLocaion);
  const [city, setCity] = useState(prevCity);
  const [interests, setInterests] = useState(prevInterests);
  const [localErr, setLocalErr] = useState(state.groups.err);

  const history = useHistory();
  const dispatch = useDispatch();
  const error = state.groups.err || localErr;
  const busy = state.groups.busy;

  const validate = Yup.object().shape({
    name: Yup.string().required().label('Group Name'),
    bio: Yup.string().min(25).required().label('Group Bio'),
  });

  return (
    <Screen
      style={{
        marginTop: 16,
      }}
      title='Edit Group'
    >
      <Form
        onSubmit={(vals, { resetForm }) => {
          // if (!vals.image.length) {
          //   setLocalErr({ message: 'Select an image' });
          //   return;
          // }

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
            updateGroup({ ...vals, location, interests, city }, params.id)
          );

          console.log({ ...vals, location, interests, city });

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
          name,
          bio,
        }}
      >
        <Input name='name' placeholder='Group Name' />
        <Input multiline rows={3} name='bio' placeholder='Group Bio' />

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
          title='Update Group Tags'
          initialVals={prevInterests}
          onSelect={interests => {
            setInterests(interests);
          }}
        />

        {error && (
          <>
            <Alert className='w-100 mb-2' icon={false} severity='error'>
              {error?.message}
            </Alert>
            <br />
          </>
        )}

        <div className='d-flex justify-content-between align-items-center w-100'>
          <div></div>
          <div className='d-flex align-items-center'>
            <Button
              variant='outlined'
              className='me-2'
              disabled={busy}
              title='Delete'
              onClick={() => {
                let confirmDelete = confirm(`Delete group '${name}'`);

                if (confirmDelete) {
                  dispatch(deleteGroup(params.id));
                  setTimeout(() => {
                    if (!error) {
                      history.push('/groups');
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
