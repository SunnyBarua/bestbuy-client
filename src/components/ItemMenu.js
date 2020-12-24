import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from './Product'

const ItemMenu = () => {
  const dispatch = useDispatch();

  const [item, setItem] = useState("laptop");
  console.log(item);

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProducts);
  }, [item]);

  const product = products?.filter((it) => it.category.toLowerCase() === item);

  return (
    <>
      <div className="item-menu-title">
        <div>
          <h1>New Product</h1>
        </div>
        <div style={{ width: "340px", marginBottom: "40px" }}>
          {" "}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the indus.
          </p>
        </div>
      </div>
      <div className="item-menu">
        <div className="menu" style={{ marginBottom: "50px" }}>
          <div
            className={
              item === "accessories" ? "active nav__link" : "nav__link"
            }
            onClick={() => setItem("accessories")}
          >
            <p>Accessories</p>
          </div>

          <div
            className={item === "laptop" ? "active nav__link" : "nav__link"}
            onClick={() => setItem("laptop")}
          >
            <p>Laptop</p>
          </div>
          <div
            className={item === "phone" ? "active nav__link" : "nav__link"}
            onClick={() => setItem("phone")}
          >
            <p>Phone</p>
          </div>
          <div
            className={item === "tab" ? "active nav__link" : "nav__link"}
            onClick={() => setItem("tab")}
          >
            <p>Tab</p>
          </div>

          <div
            className={item === "watch" ? "active nav__link" : "nav__link"}
            onClick={() => setItem("watch")}
          >
            <p>Smart Watch</p>
          </div>
        </div>

        <Row>
          {item === "accessories" &&
            products?.map((pd) => (
              <Col key={pd._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={pd} />
              </Col>
            ))}

          {product?.map((pd) => (
            <Col key={pd._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={pd} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default ItemMenu
