import React, { useState, createContext } from 'react';
import Result from '../components/results/Result';
import { useLocation } from 'react-router-dom';

const ResultsContext = createContext({});

function getResults(req, res) {
  res.forEach(() => {

  });
}

export default function Results({ json }) {

  const NUM_PREVIEW_RESULTS = 5; 
  const context = ResultsContext;
  const numResults = Object.keys(json).length;

  if (json === undefined) {
    return(
      <div>
        <p>Oops! There were no results.</p>
        <a>{"<--"} Back</a>
      </div>
    );
  }

  return(
    <div className='Results' data-testid='resultsPage'>
      <div className='resultsContainer'>
        {(
          json.map((res, index) => {
            <Result key={index} json={res} />
          })
        )}
      </div>
    </div>
  );
}