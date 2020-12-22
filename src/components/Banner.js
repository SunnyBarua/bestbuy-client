import React from 'react'
import {Carousel, Col, Row} from "react-bootstrap"
import Image1 from "../images/pic0.png";
import Image2 from "../images/pic00.jpg";
import Image3 from "../images/pic000.png";

const Banner = () => {
    return (
      <>
        <div className="banner">
          <Carousel>
            <Carousel.Item interval={1200}>
              {/* <div className="overlay"></div> */}

              <Row>
                <Col lg={6} md={6} sm={12}>
                  <div className="text">
                    <Carousel.Caption>
                      <div className="banner_sub">
                        <h3>Introducing the </h3>
                        <h1>Tablekit</h1>
                        <h4>Say hello the future</h4>
                        <button>view details</button>
                      </div>
                    </Carousel.Caption>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="ban_img">
                    <div className="img-banner">
                      <img
                        className="banner-img d-block w-100"
                        src={Image1}
                        alt="First slide"
                        style={{ postion: "center" }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>

            <Carousel.Item interval={1200}>
              {/* <div className="overlay"></div> */}

              <Row>
                <Col lg={6} md={6} sm={12}>
                  <div className="text">
                    <Carousel.Caption>
                      <div className="banner_sub">
                        <h3>Introducing the </h3>
                        <h1>Mb Watch Series</h1>
                        <h4>Say hello the future</h4>
                        <button>view details</button>
                      </div>
                    </Carousel.Caption>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="ban_img">
                    <div className="img-banner">
                      <img
                        className="banner-img d-block w-100"
                        src={Image2}
                        alt="First slide"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>

            <Carousel.Item interval={1200}>
              {/* <div className="overlay"></div> */}

              <Row>
                <Col lg={6} md={6} sm={12}>
                  <div className="text">
                    <Carousel.Caption>
                      <div className="banner_sub">
                        <h3>Introducing the </h3>
                        <h1>Mb Phone</h1>
                        <h4>Say hello the future</h4>
                        <button>view details</button>
                      </div>
                    </Carousel.Caption>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="ban_img">
                    <div className="img-banner">
                      <img
                        className="banner-img d-block w-100"
                        src={Image3}
                        alt="First slide"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </div>
      </>
    );
}

export default Banner
