import React from "react"

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { Link } from "react-router-dom"

const QuickCard = (props) => {
    return (
        <Col className="px-4 my-5">
            <Card bg="dark" text="light">
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                {props.text}
            </Card.Text>
            </Card.Body>
            </Card>
        </Col>
    )
}

export default QuickCard