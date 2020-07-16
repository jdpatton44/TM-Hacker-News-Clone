import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Title({ url, title, id }) {
  return url ? (
    <a className="link" href={url}>
      {title}
    </a>
  ) : (
    <Link className="link" to={`/post?id=${id}`}>
      {title}
    </Link>
  );
}

Title.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
