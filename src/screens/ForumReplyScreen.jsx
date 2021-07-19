import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Comment, Send } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListLoading from '../components/fragments/ListLoading';
import Screen from '../components/fragments/Screen';
import colors from '../constants/Colors';
import { sendDiscussionReply } from '../store/actions/forumsActions';

export default function ForumReplyScreen({ match }) {
  const chatBottom = useRef();
  const [sendText, setSendText] = useState('');
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const uid = state.auth.token;
  const currentUserData = state.auth.user;
  const busy = state.forums.busy;
  const messages = state.forums[`${match.params.id}`];
  const filteredMessages =
    messages &&
    messages?.filter(
      message =>
        message?.messageID.toString() === match.params.message.toString()
    );

  const [{ text, replies, userData, messageID }] = filteredMessages
    ? filteredMessages
    : [];

  const { photoURL, displayName } = userData;

  useEffect(() => {
    chatBottom.current.scrollIntoView({ behaviour: 'smooth' });
  }, [dispatch]);

  return (
    <>
      <Screen title={'Replies'}>
        <Grid item xs={12}>
          <Card
            style={{
              marginBottom: 8,
              borderRadius: 0,
              border: 'none',
              borderBottom: '2px solid #ddd',
            }}
            variant='outlined'
          >
            <CardHeader
              style={{
                padding: 8,
                paddingTop: 12,
                alignItems: 'flex-start',
              }}
              avatar={
                <Avatar src={photoURL} aria-label='recipe'>
                  R
                </Avatar>
              }
              title={`${displayName} . ${moment(messageID).fromNow()}`}
              subheader={text}
            />
            <CardActions
              style={{
                padding: 0,
              }}
            >
              <IconButton aria-label='add to favorites'>
                <Comment
                  style={{
                    color: colors.theme,
                  }}
                />
              </IconButton>
              <Typography color='primary' variant='body2'>
                {replies ? `${replies?.length} Replies` : 'No replies'}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {busy ? (
            <ListLoading />
          ) : (
            replies &&
            replies.map((reply, i = 0) => {
              const { user, text, replyID, userData } = reply;
              let right = user === uid;

              return (
                <Card
                  style={{
                    marginBottom: 8,
                    borderRadius: 0,
                    border: 'none',
                    borderBottom: '2px solid #ddd',
                  }}
                  key={i}
                  variant='outlined'
                >
                  <Typography variant='body2' color='textSecondary'>
                    Replying to{' '}
                    <span style={{ color: colors.theme }}>{displayName}</span>
                  </Typography>
                  <CardHeader
                    style={{
                      padding: 8,
                      paddingTop: 12,
                      alignItems: 'flex-start',
                    }}
                    avatar={
                      <Avatar
                        src={
                          right ? currentUserData?.photoURL : userData?.photoURL
                        }
                        aria-label='recipe'
                      >
                        R
                      </Avatar>
                    }
                    title={`${
                      right
                        ? currentUserData?.displayName
                        : userData?.displayName
                    } . ${moment(replyID).fromNow()}`}
                    subheader={text}
                  />
                </Card>
              );
            })
          )}
        </Grid>
      </Screen>

      <div
        style={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          bottom: 0,
          width: '100%',
          minHeight: '20px',
          boxSizing: 'border-box',
          padding: '8px 11px',
          backgroundColor: '#fff',
          borderTop: '2px solid #ddd',
        }}
      >
        <input
          style={{
            border: 'none',
            flex: 1,
            outline: 'none',
            ':focus': {
              outline: 'none',
            },
          }}
          value={sendText}
          onChange={e => setSendText(e.target.value)}
          type='text'
          placeholder='Type a message'
        />
        <div style={{}}>
          <IconButton
            onClick={() => {
              dispatch(
                sendDiscussionReply(
                  sendText,
                  match.params.id,
                  match.params.message
                )
              );
              setSendText('');
              chatBottom.current.scrollIntoView({ behaviour: 'smooth' });
            }}
            disabled={sendText.length < 2}
          >
            <Send />
          </IconButton>
        </div>
      </div>
      <div ref={chatBottom}></div>
    </>
  );
}
