import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'

const Footer = () => {
    return (
      <>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    Copyright &copy; BestBuy
                </Col>
            </Row>
          <h1>Footer</h1>
        </Container>
      </>
    );
}

export default Footer
