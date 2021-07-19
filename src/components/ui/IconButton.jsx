import React from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';
import { Home } from '@material-ui/icons';

export default function IconButton({ label, icon }) {
  return (
    <MuiIconButton aria-label={label} className={{}}>
      {icon ? icon : <Home />}
    </MuiIconButton>
  );
}
