import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "./style.css";
import classes from "./Demo.module.css";
import SideBar from "../../Components/SideBar/sidebar";

function BannerSection() {
  const images = [
    "/img/Carousel.jpg",
    "/img/Carousel.jpg",
    "/img/Carousel.jpg",
  ];
  const slides = images.map((url, index) => {
    return (
      <Carousel.Slide key={index}>
        <img alt="" src={url} />
      </Carousel.Slide>
    );
  });
  return (
    <>
      <div className="container">
        <div className="banner">
          <div className="category">
            <SideBar></SideBar>
          </div>
          <div className="carousel">
            <Carousel withIndicators>{slides}</Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerSection;
