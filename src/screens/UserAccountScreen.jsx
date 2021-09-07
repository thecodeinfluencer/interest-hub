import { Avatar, Chip, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Screen from '../components/fragments/Screen';
import Button from '../components/ui/Button';
import { updateMessageList } from '../store/actions/messageActions';

function UserAccountScreen({ match }) {
  //   const [map, setMap] = useState(null);
  const state = useSelector(state => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = state.auth.user;
  const people = state.people.list;
  const [{ firstName, surname, email, uid, photoURL, interests }] =
    people.filter(person => person?.uid === match.params.id);

  useEffect(() => {
    // dispatch(loadUserData());
  }, [dispatch]);

  return (
    <Screen title='Profile'>
      <Grid xs={12} item>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
          <Avatar
            src={
              photoURL
                ? photoURL
                : `https://ui-avatars.com/api/?background=random&name=${firstName}+${surname}`
            }
            style={{
              width: 80,
              height: 80,
              marginRight: 20,
            }}
          ></Avatar>
          <div>
            <Typography style={{ lineHeight: 1 }} variant='h6'>
              {firstName + ' ' + surname}
            </Typography>
            <Typography variant='body1'>{email}</Typography>
            <div style={{ display: 'flex' }}>
              <Button
                outlined
                title='Message'
                onClick={() => {
                  dispatch(updateMessageList(user?.uid, uid));
                  history.push(`/messages/${uid}`);
                }}
              />
            </div>
          </div>
        </div>
      </Grid>

      <Grid xs={12} item>
        <Typography
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
          variant='h6'
          noWrap={true}
        >
          Interests
        </Typography>
      </Grid>

      <Grid xs={12} item>
        {interests &&
          interests.map(interest => (
            <Chip
              key={`${Math.random() * 1000}`}
              style={{
                marginRight: 6,
                marginBottom: 8,
              }}
              label={interest}
              variant='outlined'
              color='primary'
            />
          ))}
      </Grid>
    </Screen>
  );
}

export default React.memo(UserAccountScreen);
