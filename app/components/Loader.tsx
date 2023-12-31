import React from 'react';
import './styles/Loader.css';

type Props = {};

function Loader({}: Props) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
