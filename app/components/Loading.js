import React from 'react';
import { css } from '@emotion/core';
import MoonLoader from 'react-spinners/MoonLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #ffc600;
`;

export default function Loading({ loading }) {
  return (
    <div className="sweet-loading">
      <MoonLoader css={override} size={100} color="red" loading={loading} />
    </div>
  );
}
