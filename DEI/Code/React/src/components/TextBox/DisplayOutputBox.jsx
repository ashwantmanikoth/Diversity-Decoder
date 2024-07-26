import React from 'react';
import './DisplayOutputBox.css';

const DisplayOutputBox = ({ data }) => {
  return (
    <div className="display-box">
      {data.map((result, index) => (
        <p key={index}>
          {result.sentence.split(" ").map((word, i) => (
            result.flagged_words.includes(word) ? (
              <span key={i} className="highlight">{word} </span>
            ) : (
              word + " "
            )
          ))}
        </p>
      ))}
    </div>
  );
};

export default DisplayOutputBox;
