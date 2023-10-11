import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/esm/Image";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Blog = (props) => {
    const [posts, setPosts] = useState([])

    const cat = useLocation().search

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/" + cat)
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData();
    }, [cat])

    return (
        <main>
            <Container>
                <h1>{props.title}</h1>
                {posts.map(post => {
                    return (
                    <Row className="post" key={post.id}>
                        <Col sm={4}>
                            <Image
                                src={post.image}
                                fluid
                            ></Image>
                        </Col>
                        <Col sm={8}>
                            <h1 className='font-weight-light'>{post.title}</h1>
                            <Link className="link" to={'/doku/post/' + post.id + ''}>Mehr erfahren</Link>
                            <p className="mt-4">{post.short}</p>
                        </Col>
                    </Row>
                )})}
            </Container>
        </main>
    )
}

export default Blog