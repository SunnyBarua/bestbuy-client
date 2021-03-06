import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { useHistory, Link, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import { ORDER_PAY_RESET } from "../constants/orderConstants";


const OrderScreen = () => {
  const orderId=useParams().id
  const [sdkReady,setSdkReady]=useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

  
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  if(!loading){
    const addDecimals=(num)=>{
      return (Math.round(num*100)/100).toFixed(2)
    }
    order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>acc+item.price* item.qty,0))
  }

  useEffect(() => {
    const addPayPalScript=async()=>{
    const {data:clientId}=await axios.get("https://doctorsportalapi.herokuapp.com/api/config/paypal")
    console.log(clientId)
    const script=document.createElement('script')
    script.type="text/javascript"
    script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
    script.async=true
    script.onload=()=>{
      setSdkReady(true)
    }
    document.body.appendChild(script)

  }
  if(!order || successPay){
    dispatch({ type: ORDER_PAY_RESET });
    dispatch(getOrderDetails(orderId))
    
  }else if(!order.isPaid){
    if(!window.paypal){
      addPayPalScript()
    }else{
      setSdkReady(true)
    }
  }
    
  }, [dispatch,orderId,successPay,order]);

  const successPaymentHandler=(paymentResult)=>{
    console.log(paymentResult)
    dispatch(payOrder(orderId,paymentResult))
  }

return loading ? (
  <Loader />
) : error ? (
  <Message varian="danger">{error}</Message>
) : (
  <>
    <h1>Order {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant="flush" key={order._id}>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Name:</strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              <a className="link" href={`mailto:${order.user.email}`}>
                {order.user.email}
              </a>
            </p>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},
              {order.shippingAddress.postalCode},{order.shippingAddress.country}
              ,
            </p>
            {order.isDelivered ? (
              <Message variant="success">Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method:</strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item ley={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`} className="link">
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader/>}

                {!sdkReady ? <Loader/>:(<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} key={order._id}/>)}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  </>
);
};

export default OrderScreen;
