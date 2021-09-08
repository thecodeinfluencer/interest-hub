import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import Button from '../ui/Button';

export default function GroupChat({
  replies,
  sender,
  time,
  content,
  route,
  reply,
  feature,
}) {
  const history = useHistory();
  const { displayName, photoURL } = sender;

  return (
    <div>
      <div className='d-flex align-items-center'>
        <Avatar src={photoURL}></Avatar>
        <div className='ms-2 d-flex align-items-center '>
          <Typography>{displayName}</Typography>
          <Typography className='ms-2 me-2'>.</Typography>
          <Typography color='textSecondary' ariant='body2'>
            {time}
          </Typography>
        </div>
      </div>
      <div className='d-flex align-items-center center-horizontal'>
        <Avatar className='invisible'></Avatar>
        <div className='ms-2'>
          <Typography>{content}</Typography>
        </div>
      </div>
      {!reply && (
        <div className='d-flex align-items-center'>
          <Avatar className='invisible'></Avatar>
          <div className='ms-2 d-flex align-items-center '>
            <Button
              onClick={() => {
                route && !feature && history.push(route);
              }}
              disabled={!route}
              variant='text'
              className='py-0 px-0'
              size='small'
              title={
                <Typography color='textSecondary' variant='body2'>
                  {replies?.length} Replies
                </Typography>
              }
            />
            {!feature && (
              <>
                <Typography className='ms-2 me-2'>.</Typography>
                <Button
                  onClick={() => {
                    route && history.push(route);
                  }}
                  disabled={!route}
                  variant='text'
                  className='py-0 px-0'
                  size='small'
                  title='Reply'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
