import React from "react"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import { Link } from "react-router-dom"

const About = (props) => {
    return (
        <Container>
          <Row className="px-4 my-5">
            <Col sm={4}>
              <Image
                src="https://picsum.photos/400/400"
                fluid
                roundedCircle
              ></Image>
              </Col>
            <Col sm={8}>
              <h1 className='font-weight-light'>Minute 01:36:30</h1>
              <p className="mt-4">
                Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.
              </p>
              <Button>Call to Action</Button>
            </Col>
          </Row>
          <Row className="px-4 my-5">
            <Col sm={5}>
              <h1 className='font-weight-light'>Grrr</h1>
              <p className="mt-4">
                Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.
              </p>
              <Button>Call to Action</Button>
            </Col>
            <Col sm={7}>
              <Image
                src="https://picsum.photos/900/400"
                fluid
                rounded
              ></Image>
              </Col>
          </Row>
          
        </Container>
    )
}

export default About