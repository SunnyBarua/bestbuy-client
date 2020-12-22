import React, { useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Carousel, Col, Image, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { LinkContainer } from 'react-router-bootstrap'

const ProductCarousel = () => {
  
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

 
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <LinkContainer to={`/product/${product._id}`}>
            <div className="product-carousel">
              <div className="carousel-details">
                <Carousel.Caption className="carousel-caption">
                  <h1>Introducing the</h1>
                  <h4 style={{ color: "#55bc75" }}>{product.name}</h4>
                  <h5>${product.price}</h5>
                  <Link  to={`/product/${product._id}`} className="linkBtn">
                    View Details
                  </Link>
                 
                </Carousel.Caption>
              </div>
              <div className="carousel-img">
                {" "}
                <Image
                  style={{ width: "700px", height: "250px" }}
                  src={product.image}
                  alt={product.name}
                  className="carousel-product-img"
                />
              </div>
            </div>
          </LinkContainer>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel