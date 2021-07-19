import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ChevronRightRounded, Comment, Send } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ListLoading from '../components/fragments/ListLoading';
import Screen from '../components/fragments/Screen';
import colors from '../constants/Colors';
import {
  loadForumMessages,
  sendDiscussion,
} from '../store/actions/forumsActions';

export default function ForumRouteScreen({ match }) {
  const [text, setText] = useState('');
  const history = useHistory();
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const uid = state.auth.token;
  const currentUserData = state.auth.user;
  const messages = state.forums[`${match.params.id}`]?.map(message => message);
  const busy = state.forums.busy;

  useEffect(() => {
    dispatch(loadForumMessages(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Screen
        title={
          <span style={{ textTransform: 'capitalize' }}>{match.params.id}</span>
        }
      >
        {busy ? (
          <ListLoading />
        ) : (
          <Grid item xs={12}>
            {messages &&
              messages.map((message, i = 0) => {
                let { user, text, messageID, replies, userData } = message;
                let right = user === uid;

                return (
                  <Card
                    style={{
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderBottom: '2px solid #ddd !important',
                      borderRadius: 0,
                    }}
                    variant='outlined'
                    key={i}
                  >
                    <CardHeader
                      style={{
                        padding: 8,
                        paddingTop: 12,
                        alignItems: 'flex-start',
                      }}
                      avatar={
                        <Avatar
                          src={
                            right
                              ? currentUserData?.photoURL
                              : userData?.photoURL
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
                      } . ${moment(messageID).fromNow()}`}
                      subheader={text}
                    />
                    <Divider />
                    <CardActions
                      style={{
                        padding: 0,
                      }}
                      onClick={() =>
                        history.push(`/forums/${match.params.id}/${messageID}`)
                      }
                    >
                      <IconButton aria-label='add to favorites'>
                        <Comment
                          style={{
                            color: colors.theme,
                          }}
                        />
                      </IconButton>
                      <Typography color='primary' variant='body2'>
                        {replies?.length > 0
                          ? `${replies?.length} Replies`
                          : 'Leave a reply'}
                      </Typography>
                      <IconButton
                        style={{ marginLeft: 'auto' }}
                        aria-label='show more'
                      >
                        <ChevronRightRounded
                          style={{
                            color: colors.theme,
                          }}
                        />
                      </IconButton>
                    </CardActions>
                  </Card>
                );
              })}
          </Grid>
        )}
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
          value={text}
          onChange={e => setText(e.target.value)}
          type='text'
          placeholder='Type a message'
        />
        <div style={{}}>
          <IconButton
            onClick={() => {
              dispatch(sendDiscussion(text, match.params.id));
              setText('');
            }}
            disabled={text.length < 3}
          >
            <Send />
          </IconButton>
        </div>
      </div>
    </>
  );
}
