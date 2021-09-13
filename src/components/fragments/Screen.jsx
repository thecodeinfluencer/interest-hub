import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  // ForumRounded as Forums,
  HomeRounded as Home,
  MessageRounded as Messages,
  PeopleRounded as Groups,
} from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppHeader from '../ui/AppHeader';

const tabs = [
  { id: 0, label: 'Home', icon: <Home />, link: '/' },
  { id: 1, label: 'Groups', icon: <Groups />, link: '/groups' },
  // { id: 2, label: 'Forums', icon: <Forums />, link: '/forums' },
  { id: 2, label: 'Messages', icon: <Messages />, link: '/messages' },
];

const useStyles = makeStyles({
  bottomTab: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 2,
    boxShadow: ' 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  screen: {
    paddingBottom: 56,
  },
});

export default function Screen({ style, children, title, tab, authPass }) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();
  const state = useSelector(state => state);

  const user = state.auth.user;

  useEffect(() => {
    const currentNavId =
      tab &&
      tabs.filter(tab => tab?.link === window?.location?.pathname)[0]?.id;

    if (JSON.stringify(user) === '{}') {
      !authPass && history.push('/welcome');
    }
    setValue(currentNavId);
  }, [tab, user, history, authPass]);

  return (
    <>
      <Container
        maxWidth='sm'
        style={{
          // backgroundColor: colors.bg,
          paddingTop: 56,
          overflow: 'hidden',
          ...style,
        }}
      >
        <AppHeader tab={tab} title={title} authPass={authPass} />
        <Grid className={classes.screen} spacing={1} container>
          {children}
        </Grid>
        {tab && (
          <BottomNavigation
            value={value}
            showLabels
            className={classes.bottomTab}
          >
            {tabs.map(tab => {
              return (
                <BottomNavigationAction
                  key={`${tab.link}`}
                  onClick={() => {
                    history.push(tab.link);
                    setValue(tab.id);
                  }}
                  label={tab.label}
                  icon={tab.icon}
                />
              );
            })}
          </BottomNavigation>
        )}
      </Container>
    </>
  );
}
