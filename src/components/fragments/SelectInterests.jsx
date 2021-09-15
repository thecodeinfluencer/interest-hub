import { Chip, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';

export default function SelectInterests({ onSelect, title, initialVals }) {
  const [iArr, setIArray] = useState(initialVals || []);

  return (
    <Grid
      item
      xs={12}
      style={{
        paddingBottom: 36,
      }}
    >
      <Typography
        style={{
          marginTop: 20,
          marginBottom: 10,
        }}
        variant='h6'
      >
        {title || 'Select Your Interests'}
      </Typography>

      {[
        'arts & culture',
        'career & business',
        'community & environment',
        'dance',
        'fashion & beauty',
        'film and animation',
        'food & drink',
        'games',
        'health & wellbeing',
        'hobbies & passions',
        'identity & language',
        'movements & politics',
        'music',
        'parenting & family',
        'pets & animals',
        'photography',
        'programming',
        'religion & spirituality',
        'science & education',
        'skating',
        'social activities',
        'sports & fitness',
        'support & coaching',
        'technology',
        'travel & outdoor',
        'writing and books',
      ].map(interest => {
        return (
          <Chip
            key={`${Math.random() * 1000}`}
            label={interest}
            variant={iArr.includes(interest) ? 'default' : 'outlined'}
            color='primary'
            style={{
              marginRight: 6,
              marginBottom: 8,
            }}
            onClick={() => {
              if (iArr.includes(interest)) {
                setIArray(iArr.filter(val => val !== interest));
                onSelect && onSelect(iArr.filter(val => val !== interest));
              } else {
                setIArray([...iArr, interest]);
                onSelect && onSelect([...iArr, interest]);
              }
            }}
          />
        );
      })}
    </Grid>
  );
}
