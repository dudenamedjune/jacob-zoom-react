import React, { useState } from 'react';


const cardStyle = {
    width: '18rem',
    border: '1px solid black',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    backgroundColor: '#f2f2f2',
    padding: '4rem',
    margin: '1rem',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#000000',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: '0.3s',
    borderRadius: '0.5rem',
};

const Card = ({
    title,
    description,
    imgSrc,
    buttonText,
    onButtonClick,
}) => {
    const [buttonColor, setButtonColor] = useState("");

    const toggle = () => {
        setButtonColor(buttonColor === "green" ? "" : "green");
    }
    return (  
        <div className='card' style={{ ...cardStyle, backgroundColor: buttonColor }}>
                <h1>{title}</h1>
                <p>{description}</p>
                <img src={imgSrc} />
                {buttonText && <button onClick={onButtonClick}>{buttonText}</button>}
        </div> 
    );

}

export default Card;