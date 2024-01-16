import React from 'react';
import Logo from '../assets/footerIcons/icoBannerColor.png';
import icoFacebook from '../assets/footerIcons/icoFacebook.png';
import icoInstagram from '../assets/footerIcons/icoInstagram.png';
import icoTwitter from '../assets/footerIcons/icoTwitter.png';
import icoEmail from '../assets/footerIcons/icoEmail.png';
import icoUbication from '../assets/footerIcons/icoUbication.png';
import icoCall from '../assets/footerIcons/icoCall.png';

const Footer = () => {
    return (
        <footer className="bg-white py-8"> 
            <div className="flex flex-col md:flex-row">
                <div className="flex items-start justify-center md:w-1/4">
                    <img src={Logo} className="h-7 w-45" />
                </div>
                <div className="md:w-1/4">
                    <h4 className="text-center text-black-600" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px' }}>Redes sociales</h4>
                    <div className="flex justify-center mt-4">
                        <div className="mr-8">
                            <img src={icoFacebook} className="h-6 w-6" />
                        </div>
                        <div className="mr-8">
                            <img src={icoInstagram} className="h-6 w-6" />
                        </div>
                        <div>
                            <img src={icoTwitter} className="h-6 w-6" />
                        </div>
                    </div>
                </div>
                <div className="md:w-1/4 md:text-center md:items-center md:mt-0 md:space-y-2">
                    <h4 className="text-center text-black-600" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px' }}>
                        Enlaces
                    </h4>
                    <ul className="mt-4 md:mt-0 md:text-left sm:text-center " style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: '15px' }}>
                        <li>Musica</li>
                        <li>Danza</li>
                        <li>Cine</li>
                        <li>Exposicion de arte</li>
                        <li>Literatura</li>
                        <li>Foros Teatro Debate</li>
                        <li>Stand y Comedia</li>
                    </ul>
                </div>
                <div className="md:w-1/4">
                    <h4 className="text-center text-black-600" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px' }}>Contáctanos</h4>
                    <div className="flex flex-col items-start mt-4 space-y-2">
                        <div className="flex items-center">
                            <img src={icoEmail} className="h-6 w-6 mr-2" />
                            <h3 className="text-gray-600">ejemplo@gmail.com</h3>
                        </div>
                        <div className="flex items-center">
                            <img src={icoUbication} className="h-6 w-6 mr-2" />
                            <h3 className="text-gray-600">en tu corazon baby</h3>
                        </div>
                        <div className="flex items-center">
                            <img src={icoCall} className="h-6 w-6 mr-2" />
                            <h3 className="text-gray-600">9999-9999</h3>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;