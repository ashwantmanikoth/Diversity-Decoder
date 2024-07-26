import React, { useState } from 'react';
import './InputJobAd.css';

const InputJobAd = ({ onSubmit }) => {
    const [inputText, setInputText] = useState('');

    const handleChange = (e) => {
        setInputText(e.target.value);

    };

    const handleClick = (e) => {
        onSubmit(inputText);
    };


    return (
        <div className="input-box">
          
                <input
                    type="text"
                    value={inputText}
                    onChange={handleChange}
                    placeholder="Copy and Paste you Job Ad here"
                />

                <button type="button" onClick={handleClick}>Submit</button>

            

        </div>
    );
};

export default InputJobAd;
