import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Screen from '../components/fragments/Screen';
import '../styles/list.css';

const useStyles = makeStyles(theme => ({
  container: {
    padding: 16,
  },
  root: {
    ...theme.typography.body1,
    textAlign: 'justify',
  },
  list: {
    ...theme.typography.body1,
    textAlign: 'left',
  },
}));

export default function Promise() {
  const classes = useStyles();

  return (
    <Screen title=' ' authPass>
      <Grid item xs={12} class={classes.container}>
        <Typography variant='h5'>Our Experience Promise</Typography>
        <br />
        <Typography variant='h6'>We Promise To: </Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            Serve you with a smile and be pleasant when interacting with you.
            Ensure that you are handled professionally with courtesy, efficiency
            and objectivity. Strive to always capture your feedback to enable us
            enhance your experience. Create a Digital Experience that is
            customized, easy and instant.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>
          Our Customer Experience Commitment:
        </Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            We are committed to the delivery of relevant products and a
            complementing outstanding experience with a view to facilitate your
            needs effortlessly with Convenience, Ease and Trust because we put
            our customers first.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>In our Solution Offering, we will:</Typography>
        <Typography variant='body1' class={classes.list}>
          <ul>
            <li>
              Take ownership and personal responsibility for all our action when
              handling your concerns.
            </li>
            <li>
              Endeavor to provide you with complete and correct information, and
              solution at first contact.
            </li>
            <li>
              Endeavor to exceed your expectation with our knowledge and
              creativity to keep you satisfied and happy.
            </li>
            <li>Respond to your requests with honesty and timely.</li>
            <li>
              Keep you regularly updated on the progress of your requests.
            </li>
          </ul>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>For your Reassurance, we will:</Typography>
        <Typography variant='body1' class={classes.list}>
          <ul>
            <li>
              Create clear and stringent internal measures to ensure you receive
              the best service.
            </li>
            <li>
              Act in accordance with the law that governs the industry and the
              laws of the land.
            </li>
          </ul>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>
          You can help us serve you better by:
        </Typography>
        <Typography variant='body1' class={classes.list}>
          <ul>
            <li>
              Providing us with the required information (feedback) or
              documentation when contacting us. Giving us your views,
              suggestions and feedback.
            </li>
          </ul>
        </Typography>
        <br />
        <br />
      </Grid>
    </Screen>
  );
}
