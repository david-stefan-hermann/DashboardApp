import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'

import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import PostList from "../components/PostList"
import TableOfContent from "../components/TableOfContent"
import OnSitePost from "../components/OnSitePost"
import { PostContextProvider } from '../context/postContext';

const Blog = (props) => {
    return (
        <main>
            <PostContextProvider>
            <Container>
                <Row className="px-4 my-5">
                    <Col sm={5}>
                        <TableOfContent></TableOfContent>
                    </Col>
                    <Col sm={7}>
                        <PostList></PostList>
                    </Col>
                </Row>
                <OnSitePost></OnSitePost>
            </Container>
            </PostContextProvider>
        </main>
    )
}

export default Blog