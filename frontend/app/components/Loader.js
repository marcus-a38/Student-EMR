import React from 'react';
import '../styles/Loader.css';

export default function Loader() {
  return (
    <div className="Loader">
      <svg width="64px" height="48px">
        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
      </svg>
    </div>
  );
}