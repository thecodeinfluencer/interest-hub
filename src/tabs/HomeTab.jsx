import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Screen from '../components/fragments/Screen';
import { distance, formatDistance, getInitials } from '../methods';
import {
  loadChatMessages,
  loadMessageList,
} from '../store/actions/messageActions';
import { loadPeople } from '../store/actions/peopleActions';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%',
  },
  gridListTile: {
    borderRadius: 10,
    padding: 0,
    margin: 0,
    '& .MuiGridListTile-tile': {
      borderRadius: 4,
    },
  },
  title: {
    color: '#fff',
  },
  titleBar: {
    background: 'rgba(0,0,0,.6)',
  },
  event: {
    display: 'flex',
    marginBottom: 10,
  },
  cover: {
    width: 151,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  sectionHeader: {
    textTransform: 'uppercase',
    fontSize: '1rem',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
}));

export default function HomeTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state => state);
  const user = state.auth.user;
  const people = state.people.list.filter(person => person?.uid !== user?.uid);

  useEffect(() => {
    dispatch(loadPeople());
    dispatch(loadChatMessages());
    dispatch(loadMessageList());
  }, [dispatch]);

  return (
    <Screen tab>
      {/* <Grid item xs={12}>
        <Typography className={classes.sectionHeader} variant='h6'>
          Your Groups
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={1.6} spacing={8}>
            {[1, 2, 3, 4, 5, 6].map(tile => (
              <GridListTile
                variant='outlined'
                className={classes.gridListTile}
                key={`${Math.random() * 1000}`}
              >
                <div
                  style={{
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,.6)',
                    backgroundImage: `url("${image}")`,
                    backgroundSize: 'cover',
                    borderRadius: '10px !important',
                    backgroundBlendMode: 'soft-light',
                  }}
                ></div>
                <GridListTileBar
                  title={'Food and Drinks'}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton aria-label={`star ${'Food and Drinks'}`}>
                      <Folder className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Grid> */}
      <Grid item xs={12}>
        <Typography className={classes.sectionHeader} variant='h6'>
          Nearby People
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List style={{ margin: 0, padding: 0 }}>
          {people.map(person => (
            <ListItem
              style={{
                marginBottom: 10,
              }}
              component={Card}
              variant='outlined'
              key={`${Math.random() * 1000}`}
              onClick={() => history.push(`/people/${person?.uid}`)}
            >
              <ListItemAvatar>
                <Avatar
                  src={
                    person?.photoURL
                      ? person?.photoURL
                      : `https://ui-avatars.com/api/?name=${person?.firstName}+${person?.surname}&background=random`
                  }
                >
                  {getInitials(person)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={person?.displayName}
                secondary={formatDistance(
                  distance(
                    person?.location?.latitude,
                    person?.location?.longitude,
                    user?.location?.latitude,
                    user?.location?.longitude
                  )
                )}
              />
              {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <ChevronRight />
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
          ))}
        </List>
      </Grid>
      {/* <Grid item xs={12}>
        <Typography className={classes.sectionHeader} variant='h6'>
          Your Events
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {[1, 2, 3, 4, 5, 6].map(event => (
          <Card
            key={`${Math.random() * 1000}`}
            variant='outlined'
            className={classes.event}
          >
            <CardContent className={classes.content}>
              <Typography component='h5' variant='h5'>
                Live From Space
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                Mac Miller
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.cover}
              image={image}
              title='Live from space album cover'
            />
          </Card>
        ))}
      </Grid> */}
    </Screen>
  );
}
