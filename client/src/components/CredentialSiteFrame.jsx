import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


import { Link, useNavigate } from "react-router-dom";

const CredentialSiteFrame = (props) => {
    return (
        <Container fluid data-bs-theme="dark" className=" bg-dark">
            <Row className="myAuto vh-100 align-items-center">
                <Col>
                    <Card className="py-5 my-5">
                        <Stack gap={2} className="col-md-5 mx-auto align-items-center">
                            {props.site}
                        </Stack>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CredentialSiteFrame