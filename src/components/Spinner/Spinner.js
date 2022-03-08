import React from 'react';
import spinner from '../../images/spinner.gif';
import './Spinner.css';

const Spinner = () => {
  return (
    <>
      <img className="spinner" src={spinner} alt="spinner" />
      <h2 className="header_loading">Loading...</h2>
    </>
  );
};

export default Spinner;
