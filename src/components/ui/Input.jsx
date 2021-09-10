import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';

export default function Input({
  name,
  label,
  placeholder,
  adornment,
  adornmentType,
  type,
  ...defaultProps
}) {
  const { handleChange, errors, setFieldTouched, touched, values } =
    useFormikContext();

  return (
    <FormControl
      fullWidth
      variant='outlined'
      color='primary'
      style={{ marginTop: 8, marginBottom: 8 }}
    >
      <InputLabel
        style={{ backgroundColor: '#fff', paddingLeft: 4, paddingRight: 4 }}
      >
        {label ? label : placeholder}
      </InputLabel>
      <OutlinedInput
        value={values[name]}
        error={name && touched[name] && errors[name] && true}
        // label={label}
        placeholder={placeholder}
        // helpertext={name && touched[name] && errors[name] ? errors[name] : null}
        onChange={name && handleChange(name)}
        onBlur={() => name && setFieldTouched(name)}
        type={type}
        startAdornment={
          adornment && adornmentType !== 'end' ? (
            <InputAdornment position='start'>{adornment}</InputAdornment>
          ) : null
        }
        endAdornment={
          adornment && adornmentType === 'end' ? (
            <InputAdornment position='end'>{adornment}</InputAdornment>
          ) : null
        }
        {...defaultProps}
      />
      {name && touched[name] && errors[name] ? (
        <small className='ml-2 text-sm' style={{ color: '#F8857D' }}>
          {errors[name]}
        </small>
      ) : null}
    </FormControl>
  );
}
