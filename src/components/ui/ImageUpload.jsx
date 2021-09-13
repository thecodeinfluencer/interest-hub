import { Avatar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import colors from '../../constants/Colors';
import Button from './Button';

export default function ImageUpload({ name, placeholder, variant, limit }) {
  const {
    errors,
    setFieldTouched,
    touched,
    setFieldValue,
    setFieldError,
    values,
  } = useFormikContext();

  const [imgArray, setImgArray] = useState(values[name]);

  useEffect(() => {
    name && setFieldValue(name, imgArray);
    placeholder && (imgArray[0] = placeholder);
  }, [touched, name, placeholder, values[name]]);

  const deleteImageUpload = item => {
    let newArray = [...imgArray];

    newArray.filter(val => {
      return val?.name !== item.name;
    });

    setImgArray(
      newArray.filter(val => {
        return val.name !== item.name;
      })
    );
  };

  return (
    <>
      {/* {JSON.stringify(imgArray)}
      {JSON.stringify(values[name])} */}
      <div style={{ display: 'flex' }}>
        {imgArray?.map(item => {
          let isUrl = item.toString().search('http') === 0;

          return (
            <>
              <Avatar
                key={Math.random() * 1000}
                variant={variant || 'circular'}
                src={isUrl ? placeholder : window?.URL?.createObjectURL(item)}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
              {!isUrl && (
                <IconButton
                  onClick={() => {
                    deleteImageUpload(item);
                  }}
                  style={{
                    backgroundColor: colors.theme,
                    color: '#fff',
                    alignSelf: 'baseline',
                    marginLeft: -30,
                    marginRight: 10,
                  }}
                  size='small'
                >
                  <Close />
                </IconButton>
              )}
            </>
          );
        })}
      </div>

      {imgArray.length < (limit ? limit : placeholder ? 2 : 4) && (
        <div style={{ position: 'relative' }}>
          <input
            onChange={() => {
              let path = document.querySelector('#upload-photo').value;
              let filetype = path
                .substring(path.lastIndexOf('.') + 1)
                .toLowerCase();

              if (
                filetype === 'jpg' ||
                filetype === 'png' ||
                filetype === 'jpeg'
              ) {
                setImgArray([
                  ...imgArray,
                  document.querySelector('#upload-photo').files[0],
                ]);
              } else {
                setFieldError(name, 'Invalid file type');
              }
            }}
            onBlur={() => name && setFieldTouched(name)}
            style={{
              position: 'absolute',
              opacity: 0.5,
              zIndex: 2,
              marginTop: 20,
            }}
            type='file'
            accept='image/*'
            name='photo'
            id='upload-photo'
          />
          <label
            style={{ width: '100%', marginTop: 10 }}
            htmlFor='upload-photo'
          >
            <Button variant='outlined' title='Upload Image' />
          </label>
        </div>
      )}

      {name && touched[name] && errors[name] && (
        <small className='mb-2 mx-2' style={{ color: '#F8857D' }}>
          {errors[name]}
        </small>
      )}
    </>
  );
}
