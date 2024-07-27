import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { like } from "../store/Likeslice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSingleAd } from "../../Config/firebase";
import './detail.css';
import { Carousel } from "react-bootstrap";
import Navbar from "../../Views/Navbar/main";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';



function Productsdetail() {
  const [product, setProduct] = useState({});
  const [contactbtn, setcontactbtn] = useState('Show Phone Number');
  const dispatch = useDispatch()


  const { adid } = useParams();

  useEffect(() => {
    getDetail();
  }, []);

  async function getDetail() {
    try {
      const res = await getSingleAd(adid);
      // console.log('res', res);
      setProduct(res);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
  }
  const addTolike = (e) => {
    e.target.value
    console.log('ad', product)
    dispatch(like(product))
}
  function contactbtnfuntion(params) {
    setcontactbtn(contact)
  }
  const { title, description, imageURL, brand, price, location, category, contact } = product;

  return (
    <div style={{ zIndex: -1 }}>

      <div id="container" className="container-fluid">
        <Row>
          <Col sm={8}>
            <div className="container " >
              <Carousel>
                {imageURL && imageURL.length > 0 ? (
                  imageURL.map((image, index) => (
                    <Carousel.Item key={index}>
                      <div className="ImgDiv">
                        <img
                          className="d-block w-100% "
                          src={image}
                          alt={`Slide ${index + 1}`}
                        />
                        </div>
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))
                ) : <></>}
              </Carousel>
            </div>
            <Card className='mt-3' style={{ width: '90%' }}>
              <Card.Body>
                {/* <Card.Title><h1>Rs : {price}$</h1></Card.Title> */}
                <br />
                <Card.Text>
                  <h3>
                    {title}
                  </h3>
                </Card.Text>
                <Card.Text>
                  <h6>
                    {brand}
                  </h6>
                </Card.Text>
                <Card.Text>
                  <h4>
                    <b>
                      Rs. {price}
                    </b>
                  </h4>
                </Card.Text>

                <div onClick={addTolike} style={{}}><img style={{ float: 'right', marginRight: '0px' }} width={30} src="https://static-00.iconduck.com/assets.00/heart-icon-512x461-rdoishra.png" alt="" /></div>
                <img style={{ float: 'right', marginRight: '20px' }} width={30} src="https://cdn-icons-png.flaticon.com/512/1358/1358023.png" alt="" />
              </Card.Body>
            </Card>
            <Card className='mt-3' style={{ width: '90%' }}>
              <Card.Body>
                <Card.Text>
                  <h1 className="">Description</h1>
                  <h4>{description}</h4>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card className='mt-5' style={{ width: '100%', }}>
              <Card.Body>
                <Card.Title><h4 className='details'><span><img width={'15%'} src="https://png.pngtree.com/png-clipart/20220213/original/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_7268049.png" alt="" /></span>abdullah</h4></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Member Since Dec 2020</Card.Subtitle>
                <br />
                <Card.Text>
                  <div className="d-grid gap-2">
                    <Button onClick={contactbtnfuntion} variant="primary" style={{ width: 300, backgroundColor: "#002F34" }} size="">
                      {contactbtn}
                    </Button>
                    <Button className="chat" variant="" style={{ width: 300, }} size="md">
                      Chat
                    </Button>
                  </div>.
                </Card.Text>

              </Card.Body>
            </Card>
            <Card className='mt-5' style={{ width: '100%', }}>
              <Card.Body>
                <Card.Title><h1>Location</h1></Card.Title>
                <Card.Text>
                  <div className="location-div">

                    <i class="ri-map-pin-2-fill njk">  <span className="location-class">{location}</span> </i>
                  </div>

                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </div>
    </div>

  );
}

export default Productsdetail;



