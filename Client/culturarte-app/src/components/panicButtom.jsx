import React from 'react';
import panicButton from '../assets/panicButtom.png';

const PanicButtom = ({toggle}) => {
    return (
        <div className="w-3/5 mx-auto ">
            <img src={panicButton} alt="panicButton" onClick={toggle} className="w-10/12 m-4 mt-12 mx-auto transition-transform hover:scale-110 cursor-pointer" />
        </div>
    );
};

export default PanicButtom;