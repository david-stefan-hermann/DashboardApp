import React, { useEffect, useState, useContext } from "react"
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
import SiteLocation from "../components/SiteLocation"
import { PostContext } from '../context/postContext';

const Blog = () => {
    const { currentPostId, setCurrentPostId, subSitesExist, currentPostTitle } = useContext(PostContext)

    const postIdFromUrl = useLocation().pathname.split("/")[2]
    
    useEffect(() => {
        console.log("Blog: " + currentPostTitle + postIdFromUrl)
        
        setCurrentPostId(postIdFromUrl)

    }, [postIdFromUrl])

    return (
        <main>
            <Container>
                <Row className="text-light my-3">
                    <Col sm={4}>
                        <Row className="text-light px-2 my-3">
                            <TableOfContent></TableOfContent>
                        </Row>
                        <Row className="text-light px-2 my-4">
                            <PostList></PostList>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Row className="text-light px-2 my-3">
                            <SiteLocation className="mb-3"></SiteLocation>
                        </Row>
                        <Row>
                            {currentPostId > 0 ? <OnSitePost></OnSitePost> : "" }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Blog