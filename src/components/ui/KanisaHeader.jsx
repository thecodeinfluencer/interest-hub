import { Avatar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ArrowBack, NotificationsRounded } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import image from '../../assets/favicon.png';
import { getInitials } from '../../methods';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    // background: "rgba(0,0,0,0)",
    // boxShadow: "none",
  },
  appbar: {
    background: '#fff',
    justifyContent: 'center',
    color: theme.palette.primary.main,
    // boxShadow: "none",
  },
}));

export default function KanisaHeader({ title, tab, authPass }) {
  const state = useSelector(state => state);
  const classes = useStyles();
  const history = useHistory();
  const user = state.auth?.user;
  const userInitials = getInitials(user);

  // const logout = () => {
  //   dispatch({ type: "SIGN_OUT" });
  // };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position='fixed'>
        <Toolbar className={classes.toolbar}>
          {!tab && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={() => history.goBack()}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant='h6' noWrap={true} className={classes.title}>
            {title ? (
              title
            ) : (
              <img
                style={{
                  height: 25,
                  width: 25,
                }}
                src={image}
                alt=''
              />
            )}
          </Typography>
          {!authPass && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={() => history.push('/notifications')}
                color='inherit'
              >
                <NotificationsRounded />
              </IconButton>

              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={() => history.push('/profile')}
                color='inherit'
                style={{
                  marginRight: 0,
                  paddingRight: 0,
                }}
              >
                {/* <AccountCircleRounded /> */}
                <Avatar
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.surname}`
                  }
                  style={{
                    height: 32,
                    width: 32,
                  }}
                >
                  {userInitials}
                </Avatar>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
