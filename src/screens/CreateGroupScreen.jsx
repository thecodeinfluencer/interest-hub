import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import Screen from '../components/fragments/Screen';
import SearchInput from '../components/fragments/SearchInput';
import SelectInterests from '../components/fragments/SelectInterests';
import Button from '../components/ui/Button';
import ImageUpload from '../components/ui/ImageUpload';
import Input from '../components/ui/Input';
import Form from '../components/utilities/Form';
import { createGroup } from '../store/actions/groupActions';
import cities2 from '../store/local/worldcities.json';

export default function CreateGroupScreen() {
  const state = useSelector(state => state);

  const [location, setLocation] = useState(null);
  const [city, setCity] = useState({});
  const [interests, setInterests] = useState([]);
  const [localErr, setLocalErr] = useState(state.groups.err);

  const history = useHistory();
  const dispatch = useDispatch();
  const error = state.groups.err || localErr;
  const busy = state.groups.busy;

  const validate = Yup.object().shape({
    name: Yup.string().required().label('Group Name'),
    bio: Yup.string().min(25).required().label('Group Bio'),
    image: Yup.array().required().label('Group Image'),
  });

  return (
    <Screen
      style={{
        marginTop: 16,
      }}
      title='Create Group'
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

          if (!location) {
            setLocalErr({ message: 'Select a nearest place to continue' });
            return;
          }

          setLocalErr(null);
          dispatch(createGroup({ ...vals, location, interests, city }));

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
          image: [],
        }}
      >
        <Input name='name' placeholder='Group Name' />
        <Input multiline rows={3} name='bio' placeholder='Group Bio' />

        <SearchInput
          data={cities2}
          onSelect={city => {
            setCity(city);
            setLocation({
              latitude: city?.lat,
              longitude: city?.lng,
            });
          }}
        />

        <ImageUpload limit={1} name='image' variant='rounded' />

        <SelectInterests
          title='Select Group Tags'
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
          <Button disabled={busy} title='Create' submit />
        </div>
      </Form>
    </Screen>
  );
}
