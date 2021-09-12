import React, { useState } from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';

export default function SearchInput({ data, onSelect }) {
  const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <div className='w-100'>
      <TextField
        className='pt-2'
        value={selectedValue || value}
        onChange={event => {
          setValue(event.target.value);
          setSelectedValue(null);
        }}
        variant='outlined'
        fullWidth
        placeholder='Search Nearest City'
      />

      <div className='w-100 pb-2'>
        {value.length > 1 && (
          <Card variant='outlined'>
            <List className='py-0'>
              {data
                .filter(
                  ({ city, country, admin_name }) =>
                    city?.toLowerCase().includes(value.toLowerCase()) ||
                    country?.toLowerCase().includes(value.toLowerCase()) ||
                    admin_name?.toLowerCase().includes(value.toLowerCase())
                )
                .slice(0, 5)
                .map(city => (
                  <ListItem
                    divider
                    button
                    key={city}
                    onClick={() => {
                      setSelectedValue(`${city.city}, ${city.country}`);
                      onSelect(city);
                      setValue('');
                      console.log(city);
                    }}
                  >
                    <ListItemText primary={`  ${city.city}, ${city.country}`} />
                  </ListItem>
                ))}
            </List>
          </Card>
        )}
      </div>
    </div>
  );
}
