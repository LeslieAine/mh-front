import React from 'react';
import { Link } from 'react-router-dom';

function Avatar({ src, alt }) {
  return (
    <Link className="nav-link" to="/creator-profile/about-creator">
      <img src={src} alt={alt} className="avatar" />
    </Link>
  );
}

export default Avatar;
