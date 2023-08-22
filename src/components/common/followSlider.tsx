import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Card } from "react-bootstrap";
import {
  ArrowLeftCircle,
  ArrowRight,
  ArrowRightCircle,
} from "react-bootstrap-icons";

import peopleData from "../../data/peopleData";

const Next = ({ style, onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className="pull-left slick-arrow"
      style={{ ...style }}
    >
      <Button>
        <ArrowLeftCircle />
      </Button>
    </div>
  );
};

const Prev = ({ style, onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className="pull-right slick-arrow"
      style={{ ...style }}
    >
      <Button>
        <ArrowRightCircle />
      </Button>
    </div>
  );
};

const FollowPeople = () => {
  const settings = {
    infinite: false,
    autoplay: false,
    centerMode: false,
    centerPadding: "0px 50px",
    focusOnSelect: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <Next />,
    nextArrow: <Prev />,
    dots: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-1">
        <h6 className="ps-1 mb-0 fw-bold">Follow People</h6>
        <Button className="border-0 bg-transparent">
          <ArrowRight className="inline-icon" />
        </Button>
      </div>
      <Slider {...settings} className="people-carousel">
        {peopleData.map((itm) => (
          <div className="single-slide">
            <Card className="user-list-item mx-1 p-2 justify-content-center text-center">
              <div className="position-relative d-flex justify-content-center">
                <Card.Img
                  variant="top"
                  className="img-fluid rounded-circle"
                  src={itm.user_avt}
                />
              </div>
              <Card.Body>
                <Card.Text className="fw-bold">{itm.user_name}</Card.Text>
                <Card.Text className="txt-2nd">{itm.department}</Card.Text>
              </Card.Body>
              <Button className="btn-outline-primary rounded-pill">
                + Follow
              </Button>
            </Card>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FollowPeople;
