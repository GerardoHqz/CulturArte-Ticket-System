import React, { useContext } from "react";
import Menu from '../components/menu/Menu'
import BillboardEvent from '../components/billboardEvent'
import Footer from '../components/Footer'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img1 from '../assets/bannerName.png'
import img2 from '../assets/banner1.png'
import img3 from '../assets/banner3.png'
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from "react-icons/io5";

function Slider() {
    const images = [
        img1, img2, img3
    ];

    const properties = {
        prevArrow: <button><IoChevronBackCircleSharp color="#FFFFFF" size={40} class="m-5 opacity-50 hover:opacity-100 hover:scale-105 active:scale-95 active:text-gray-300 ease-in-out duration-300"/></button>,
        nextArrow: <button><IoChevronForwardCircleSharp size={40} class="text-white m-5 opacity-50 hover:opacity-100 hover:scale-105 active:scale-95 active:text-gray-300 ease-in-out duration-300"/></button>
    }

    return (
        <div class="relative">
            <Fade scale={1.4} duration={2000}  {...properties}>
                {images.map((image) => (
                    <div style={{ height: "70vh" }}>
                        <div class={"flex items-center h-full w-full object-cover"} style={{ 'backgroundImage': `url(${image})`, backgroundSize: "cover" }}>
                        </div>
                    </div>
                ))}
            </ Fade>
        </div>

    );
}

function Home() {
    return (
        <div>
            <Menu />
            {Slider()}
            <BillboardEvent />
            <Footer />
        </div>
    );
}

export default Home