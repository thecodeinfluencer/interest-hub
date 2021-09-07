import { Grid, Typography, useTheme } from '@material-ui/core';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function CreateGroupCard() {
  const history = useHistory();
  const theme = useTheme();

  return (
    <Grid xs={6} item>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 120,
          borderRadius: 4,
          padding: 8,
          border: `2px solid ${theme.palette.primary.main}`,
        }}
        onClick={() => {
          history.push(`/create/group`);
        }}
      >
        <AddCircleOutlineRounded
          style={{ color: theme.palette.primary.main, width: 50, height: 50 }}
        />
        <Typography
          style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
          variant='h6'
        >
          Create Group
        </Typography>
      </div>
    </Grid>
  );
}
