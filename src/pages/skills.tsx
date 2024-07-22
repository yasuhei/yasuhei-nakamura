import { Title } from "../components/title";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { icons } from "../Utils/img";


export function Skills() {
    const sectionTwo = "Skils";

    return (
        <div id="skills" className="pt-6 flex justify-center items-center w-full flex-col">
            <Title title={sectionTwo}/>
            <div className="h-[1px] w-full bg-gradient-to-r from-indigo-500  my-6"></div>
            <Swiper
            centeredSlides={true}
            slidesPerView={5}
            loop
            autoplay={{
              delay: 1500,
              disableOnInteraction: true,
            }}
            modules={[Autoplay]}
            className="w-[90%]"
          >
            <ul className="flex justify-center items-center w-10"> 
              {icons.map((icon, index) => (
                <li key={index} className="w-full">
                <SwiperSlide>
                  <img src={icon.src} alt={icon.alt} title={icon.title} className={icon.className || ''} />
                </SwiperSlide>
              </li>
              ))}
              
            </ul>
          </Swiper>
          <div className="h-[1px] w-full bg-gradient-to-l from-indigo-500  my-6"></div>
        </div>
    )
}