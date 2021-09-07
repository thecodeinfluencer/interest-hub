import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import Button from '../ui/Button';

export default function GroupChat({ name, time, content, preview, route }) {
  const history = useHistory();

  return (
    <div>
      <div className='d-flex align-items-center'>
        <Avatar>R</Avatar>
        <div className='ms-2 d-flex align-items-center '>
          <Typography>{name}</Typography>
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
      <div className='d-flex align-items-center'>
        <Avatar className='invisible'></Avatar>
        <div className='ms-2 d-flex align-items-center '>
          <Button
            onClick={() => {
              route && history.push(route);
            }}
            disabled={preview}
            variant='text'
            className='py-0 px-0'
            size='small'
            title={
              <Typography color='textSecondary' variant='body2'>
                23 Replies
              </Typography>
            }
          />
          <Typography className='ms-2 me-2'>.</Typography>
          <Button
            onClick={() => {
              route && history.push(route);
            }}
            disabled={preview}
            variant='text'
            className='py-0 px-0'
            size='small'
            title='Reply'
          />
        </div>
      </div>
    </div>
  );
}
