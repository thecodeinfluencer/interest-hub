import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatInput from '../components/fragments/ChatInput';
import Screen from '../components/fragments/Screen';
import colors from '../constants/Colors';
import { sendMessage } from '../store/actions/messageActions';

const useStyles = makeStyles(() => ({
  container: {
    bottom: 0,
  },
  bubbleContainer: {
    width: '100%',
    display: 'flex',
  },
  bubble: {},
}));

// eslint-disable-next-line react/prop-types
export default function MessageRouteScreen({ match }) {
  const [text, setText] = useState('');
  const state = useSelector(state => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const uid = state.auth.token;
  const user = state.auth.user;
  const [
    {
      displayName: activeChatDisplayName,
      photoURL: activeChatPhotoURL,
      firstName,
      surname,
    },
  ] =
    state.messages.chatlist?.filter(chat => chat?.uid === match.params.id)
      .length > 0
      ? state.messages.chatlist?.filter(chat => chat?.uid === match.params.id)
      : [{ displayName: 'Start Chat...' }];

  let activeChatID = match.params.id.toString();

  const chats = activeChatID
    ? state.messages.list.filter(
        message =>
          (message.sender === activeChatID && message.reciever === user?.uid) ||
          (message.sender === user?.uid && message.reciever === activeChatID)
      )
    : [];

  return (
    <>
      <Screen
        style={{ paddingTop: 56 + 16 }}
        title={
          <span style={{ textTransform: 'capitalize' }}>
            {activeChatDisplayName}
          </span>
        }
      >
        <Grid item xs={12}>
          {chats &&
            chats.map(({ sender, message, time }, i = 0) => {
              let right = sender === uid;
              let left = !right;
              let direction = right ? 'right' : 'left';

              return (
                <div
                  className={`${classes.bubbleContainer} ${direction}`}
                  key={i}
                >
                  {left && (
                    <Avatar
                      src={
                        activeChatPhotoURL
                          ? activeChatPhotoURL
                          : `https://ui-avatars.com/api/?background=random&name=${firstName}+${surname}`
                      }
                    />
                  )}
                  <div
                    style={{
                      display: 'inline-block',
                      marginBottom: 16,
                      alignSelf: 'baseline',
                      maxWidth: '80%',
                    }}
                  >
                    <div
                      style={{
                        borderRadius: 10,
                        padding: 10,
                        marginRight: 10,
                        marginLeft: 10,
                        backgroundColor: left ? colors.theme : '#fff',
                        color: left ? '#fff' : colors.theme,
                        border: left ? 'none' : '1px solid ',
                      }}
                      key={i++}
                    >
                      <div className={classes.button}>{message}</div>
                    </div>
                    <Typography
                      color='textSecondary'
                      className='mx-2 my-1'
                      variant='body2'
                    >
                      {moment(time).format('hh:mm . dddd')}
                    </Typography>
                  </div>
                </div>
              );
            })}
        </Grid>
      </Screen>
      <ChatInput
        value={text}
        onChange={e => setText(e.target.value)}
        onSend={() => {
          dispatch(sendMessage(text, user?.uid, activeChatID));
          setText('');
        }}
      />
    </>
  );
}
