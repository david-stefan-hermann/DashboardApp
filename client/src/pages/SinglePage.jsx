import React, { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/esm/Image";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import moment from "moment"
import { AuthContext } from "../context/authContext";

const SinglePage = () => {
    const [post, setPost] = useState({})

    const location = useLocation()

    const postID = location.pathname.split("/")[3]

    const {currentUser} = useContext(AuthContext)

    console.log(">>> " + postID)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/" + postID)
                setPost(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData();
    }, [postID])

    console.log(post)

    return (
        <main>
            <Container className="post">
                <Row>
                    <Col sm={2}>
                        <Image
                            src={post?.img}
                            fluid
                        ></Image>
                    </Col>
                    <Col sm={10}>
                        <h2>{post.username}</h2>
                        <h3>Posted {moment(post.updated).fromNow()}</h3>
                        {currentUser.id === post.uid && <h4>Authorized</h4>}
                    </Col>
                </Row>
                <Row>
                    <Col sm={5}>
                        <Image
                            src={post?.image}
                            fluid
                        ></Image>
                    </Col>
                    <Col sm={7}>
                        <h1 className='font-weight-light'>{post.title}</h1>
                        <p className="mt-4">{post.content}</p>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default SinglePage