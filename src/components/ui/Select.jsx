import React, { useEffect } from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { useFormikContext } from 'formik';

export default function Select({
  data,
  placeholder,
  onSelectItem,
  selectedItem,
  defaultValue,
  name,
  label,
  ...defaultProps
}) {
  const { errors, setFieldTouched, touched, handleChange, setFieldValue } =
    useFormikContext();

  useEffect(() => {
    name && handleChange(name);
    selectedItem && setFieldValue(name, selectedItem);
  }, [handleChange, name, defaultValue, setFieldValue, selectedItem]);

  let selectDefaultValue = defaultValue ? defaultValue : '';

  return (
    <TextField
      style={{ width: '100%', marginTop: 8, marginBottom: 8 }}
      error={name && touched[name] && errors[name]}
      select
      label={selectedItem ? selectedItem : label ? label : placeholder}
      helperText={name && touched[name] && errors[name] ? errors[name] : null}
      defaultValue={selectDefaultValue}
      variant='outlined'
      onBlur={() => {
        name && setFieldTouched(name);
      }}
      onChange={e => {
        onSelectItem && onSelectItem(e.target.value);
      }}
      {...defaultProps}
    >
      {data.map(item => {
        let value = item.value;
        return (
          <MenuItem
            placeholder={defaultValue ? defaultValue : null}
            key={value}
            value={value}
            onClick={() => {
              setFieldValue(name, value);
            }}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
