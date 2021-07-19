import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  HomeRounded as Home,
  CardGiftcardRounded as Discover,
  PhoneRounded as Contact,
  PersonRounded as Profile,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
});

export default function BottomTabs() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const tabs = [
    { id: 0, label: 'Home', icon: <Home />, link: '/' },
    { id: 1, label: 'Discover', icon: <Discover />, link: '/discover' },
    { id: 2, label: 'Contact', icon: <Contact />, link: '/contact' },
    { id: 3, label: 'Profile', icon: <Profile />, link: '/profile' },
  ];

  return (
    <BottomNavigation value={value} showLabels className={classes.root}>
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
  );
}
