import React from 'react';
import './DisplayOutputBox.css';

const DisplayOutputBox = ({ data }) => {
  return (
    <div className="display-box" >
      {data.length == 0 ?
        data.map((result, index) => (
          <p key={index}>
            {result.sentence.split(" ").map((word, i) => (
              result.flagged_words.includes(word) ? (
                <span key={i} className="highlight">{word} </span>
              ) : (
                word + " "
              )
            ))}
          </p>
        )):"LOL"}
    </div>
  );
};

export default DisplayOutputBox;
