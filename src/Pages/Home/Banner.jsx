
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import pic1 from "../../assets/img1.jpg";
import pic2 from "../../assets/img2.jpg";
import pic3 from "../../assets/img3.webp";
import pic4 from "../../assets/img4.jpg";


const Banner = () => {
  const images = [pic4, pic2, pic3, pic1];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container ">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img className='mx-auto' src={src} alt={`Slider ${index}`} style={{ width: "90%", height:"90%" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;