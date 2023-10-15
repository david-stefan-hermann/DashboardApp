import React, { useContext, useEffect, useState, useRef } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"

import axios from "axios";
import { PostContext } from "../context/postContext"

const OnSitePost = () => {
    // loading the correct sub site

    const { post, setPost, currentPostId, setCurrentPostId } = useContext(PostContext)

    console.log("osp, current post: " + currentPostId + ".")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/" + currentPostId)
                setPost(res.data[0])
            } catch(err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    console.log("osp post: " + post.title)

    return (
        <main>
            <Container className="post">
                <Row className="px-4 my-5">
                    <h2>Aktueller Beitrag</h2>
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

export default OnSitePost