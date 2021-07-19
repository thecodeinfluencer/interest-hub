import React from 'react';
import { Card, Grid } from '@material-ui/core';

export default function DiscoverCard({ icon }) {
  return (
    <Grid item xs={3}>
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 16,
          }}
        >
          {icon}
        </div>
      </Card>
    </Grid>
  );
}
