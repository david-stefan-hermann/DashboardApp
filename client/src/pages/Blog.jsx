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

const Blog = (props) => {
    const { currentPostId, setCurrentPostId, subSitesExist, currentPostTitle } = useContext(PostContext)

    const postIdFromUrl = useLocation().pathname.split("/")[2]
    
    useEffect(() => {
        console.log("Blog: " + currentPostTitle + postIdFromUrl)
        
        setCurrentPostId(postIdFromUrl)

    }, [postIdFromUrl])

    return (
        <main>
            <Container>
                <Row className="bg-dark text-light p-5 m-3 rounded">
                    <Col sm={12}>
                        <TableOfContent></TableOfContent>
                    </Col>
                </Row>
                <Row className="m-3">
                    <SiteLocation></SiteLocation>
                </Row>
                {currentPostId > 0 ? (
                    <Row className="bg-dark text-light p-5 m-3 rounded">
                        <OnSitePost></OnSitePost>
                    </Row>
                ) : (
                    <></>
                )}
                {subSitesExist == true ? (
                    <Row className="bg-dark text-light p-5 m-3 rounded">
                        <Col sm={12}>
                            <PostList></PostList>
                        </Col>
                    </Row>
                ) : (
                    <></>
                )}
            </Container>
        </main>
    )
}

export default Blog