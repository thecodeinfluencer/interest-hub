import { IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React from 'react';

export default function ChatInput({ value, onChange, onSend }) {
  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        minHeight: '20px',
        boxSizing: 'border-box',
        padding: '8px 11px',
        backgroundColor: '#fff',
        borderTop: '2px solid #ddd',
      }}
    >
      <input
        style={{
          border: 'none',
          flex: 1,
          outline: 'none',
          ':focus': {
            outline: 'none',
          },
        }}
        value={value}
        onChange={onChange}
        type='text'
        placeholder='Type a message'
      />
      <div style={{}}>
        <IconButton onClick={onSend} disabled={value?.length < 3}>
          <Send />
        </IconButton>
      </div>
    </div>
  );
}
