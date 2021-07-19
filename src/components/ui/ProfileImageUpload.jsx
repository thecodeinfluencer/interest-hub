import { Avatar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
// import Screen from "../layout/Screen";
import colors from '../../constants/Colors';
import Button from './Button';

export default function ProfileImageUpload({ name, placeholder, label, alt }) {
  const [imgArray, setImgArray] = useState([]);

  const { errors, setFieldTouched, touched, setFieldValue, setFieldError } =
    useFormikContext();

  useEffect(() => {
    name && setFieldValue(name, imgArray);
    // placeholder && setImgArray([...imgArray, placeholder]);
    placeholder && (imgArray[0] = placeholder);
  }, [imgArray, name, setFieldValue, placeholder]);

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
      <div style={{ display: 'flex' }}>
        {imgArray.map(item => {
          let isUrl = item.toString().search('http') === 0;
          return (
            <>
              <Avatar
                alt={alt}
                src={isUrl ? placeholder : window.URL.createObjectURL(item)}
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
                  style={{ backgroundColor: colors.theme, color: '#fff' }}
                  size='small'
                >
                  <Close />
                </IconButton>
              )}
            </>
          );
        })}
      </div>

      {imgArray.length < (placeholder ? 2 : 4) && (
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
