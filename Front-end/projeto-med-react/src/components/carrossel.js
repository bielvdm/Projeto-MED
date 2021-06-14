import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function TextoSlide () {

    let definicoesCarrossel = {
        dot:true,
        infinite : true,
        speed : 500,
        slidesToShow : 5,
        slidesToScroll : 1,
        cssEase : "linear"
    }

    return(
        <Slider {...definicoesCarrossel}>
            <div>
                <div className="card">
                    <p>Gabriel</p>
                </div>
                <div className="card">
                    <p>Gabriel</p>
                </div>
                <div className="card">
                    <p>Gabriel</p>
                </div>
            </div>
        </Slider>
    )
}

export default TextoSlide;