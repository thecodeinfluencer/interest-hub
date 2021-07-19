import { Chip, Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';

export default function SelectInterests({ onSelect }) {
  const [iArr, setIArray] = useState([]);

  return (
    <Container
      style={{
        paddingBottom: 36,
      }}
      maxWidth='sm'
    >
      <Grid item xs={12}>
        <Typography
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
          variant='h6'
        >
          Select Your Interests
        </Typography>

        {[
          'music',
          'programming',
          'skating',
          'bike riding',
          'weaving',
          'partying',
          'travelling',
          'arts',
          'beliefs',
          'book clubs',
          'business',
          'career',
          'dance',
          'family',
          'fashion',
          'beauty',
          'film',
          'food & drink',
          'health',
          'hobbies',
          'culture',
          'learning',
          'outdoors',
          'pets',
          'photography',
          'social',
          'tech',
          'writting',
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
    </Container>
  );
}
