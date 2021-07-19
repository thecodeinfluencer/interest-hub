import React from 'react';
import { useFormikContext } from 'formik';
import { Button as MuiButton, CircularProgress } from '@material-ui/core';

import colors from '../../constants/Colors';

export default function Button({
  title,
  submit,
  onClick,
  disabled,
  loading,
  variant,
  outlined,
  size,
  ...defaultProps
}) {
  const formikContext = useFormikContext();
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <MuiButton
          variant={variant ? variant : outlined ? 'outlined' : 'contained'}
          size={size ? size : 'medium'}
          style={{
            marginTop: 4,
            marginBottom: 4,
            textTransform: size === 'small' && 'none',
          }}
          color='primary'
          onClick={submit ? formikContext.handleSubmit : onClick}
          disabled={disabled}
          {...defaultProps}
        >
          <span
            style={{
              visibility: loading ? 'hidden' : 'visible',
            }}
          >
            {title ? title : 'Button'}
          </span>
        </MuiButton>
        {loading && (
          <CircularProgress
            size={24}
            style={{
              color: (outlined && loading ? colors.theme : disabled)
                ? colors.theme
                : colors.white,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12,
            }}
          />
        )}
      </div>
    </div>
  );
}
