import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import * as Yup from 'yup';

import Screen from '../components/fragments/Screen';
import Button from '../components/ui/Button';
import Form from '../components/utilities/Form';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
// import KanisaActionCard from "../components/legacy/KanisaActionCard";
// import { bookService } from "../store/actions/servicesActions";
import Alert from '@material-ui/lab/Alert';

const validate = Yup.object().shape({
  image: Yup.mixed().required().label('Profile Image'),
});

export default function UpdateProfileScreen({ match }) {
  const state = useSelector(state => state);
  // const user = state.auth.user;
  const error = state.services.err;

  const {
    firstName,
    surname,
    estate,
    gender,
    contact,
    maritalStatus,
    confirmed,
    baptised,
    dob,
  } = state.auth?.user.firstName ? state.auth?.user : {};
  const { phoneNumber, email } = contact ? contact : {};

  const option = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const genderArr = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Prefer not to say', value: 'not_say' },
  ];

  const marital = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
  ];

  return (
    <Screen title='Update Profile'>
      <Grid item xs={12}>
        <Form
          onSubmit={vals => {
            // dispatch(register(vals));
            // console.log(vals);
          }}
          validationSchema={validate}
          initialValues={{
            firstName,
            surname,
            gender,
            dob,
            phoneNumber,
            email,
            estate,
            maritalStatus,
            baptised,
            confirmed,
          }}
        >
          <Input name='firstName' placeholder={firstName} />
          <Input name='surname' placeholder={surname} />
          <Select name='gender' placeholder={gender} data={genderArr} />
          <Input type='date' name='dob' placeholder={dob} />
          <Input name='phoneNumber' placeholder={phoneNumber} />
          <Input name='email' placeholder={email ? email : 'Email Adress'} />
          <Input name='estate' placeholder={estate} />
          <Select
            name='maritalStatus'
            placeholder={marital}
            label='Marital Status'
            data={marital}
          />
          <Select
            defaultValue={confirmed}
            name='baptised'
            placeholder={confirmed}
            label='Baptised'
            data={option}
          />
          <Select
            name='confirmed'
            placeholder={confirmed}
            label='Confirmed'
            data={option}
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
          {error?.errors &&
            error?.errors['phone']?.map(exc => (
              <>
                <Alert icon={false} severity='error'>
                  {exc}
                </Alert>
                <br />
              </>
            ))}
          {error?.errors &&
            error?.errors['email']?.map(exc => (
              <>
                <Alert icon={false} severity='error'>
                  {exc}
                </Alert>
                <br />
              </>
            ))}
          <Button title='Update Profile' submit />
        </Form>
      </Grid>
    </Screen>
  );
}
