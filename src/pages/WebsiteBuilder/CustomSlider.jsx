// CustomSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
      <Slider {...settings}>
          <div className="card">
              <img src="https://via.placeholder.com/300" alt="Image 1" />
              <h4>Name 1</h4>
              <p>Description 1</p>
              <p>Location 1</p>
              <div>
                  <a href="#link1">Link 1</a>
                  <a href="#link2">Link 2</a>
              </div>
          </div>
          <div className="card">
              <img src="https://via.placeholder.com/300" alt="Image 2" />
              <h4>Name 2</h4>
              <p>Description 2</p>
              <p>Location 2</p>
              <div>
                  <a href="#link1">Link 1</a>
                  <a href="#link2">Link 2</a>
              </div>
          </div>
          <div className="card">
              <img src="https://via.placeholder.com/300" alt="Image 3" />
              <h4>Name 3</h4>
              <p>Description 3</p>
              <p>Location 3</p>
              <div>
                  <a href="#link1">Link 1</a>
                  <a href="#link2">Link 2</a>
              </div>
          </div>
      </Slider>
  );
};

export default CustomSlider;
