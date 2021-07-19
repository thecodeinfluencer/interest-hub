import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {
  NotificationsRounded,
  ExitToAppRounded,
  ArrowBack,
} from '@material-ui/icons';

import { appName } from '../../store/local/contents';
import { useHistory } from 'react-router';

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
}));

export default function Header({ title, tab }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
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
          <Typography variant='h6' className={classes.title}>
            {title ? title : appName}
          </Typography>

          <div>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              onClick={null}
            >
              <NotificationsRounded />
            </IconButton>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={null}
              color='inherit'
            >
              <ExitToAppRounded />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
