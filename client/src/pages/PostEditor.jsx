import React, { useEffect, useState, useContext } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import PostList from "../components/PostList"
import TableOfContent from "../components/TableOfContent"
import OnSitePost from "../components/OnSitePost"
import SiteLocation from "../components/SiteLocation"
import { PostContext } from '../context/postContext';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from "../components/LoadingSpinner"

const PostEditor = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [ post, setPost ] = useState({})

    const postIdFromUrl = useLocation().pathname.split("/")[2]
    
    console.log("PE: " + typeof postIdFromUrl)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/" + postIdFromUrl)
                setPost(res.data)
                console.log(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [])

    return (
        <>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            <Row className="bg-dark text-light p-5 m-3 rounded">
                <Col sm={6}>
                    <h3>Bearbeiten: {post?.title}</h3>

                    <h5>Beschreibung</h5>
                    <FloatingLabel controlId="edit-short" label="Beschreibung">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="privat?"
                    />
                </Col>
                <Col sm={6}>
                { post?.short ? 
                    <>
                    <Container className="boxshadow px-4 secondary-color rounded-top">
                        Beschreibung
                    </Container>
                    <Container className="boxshadow p-4 mb-4 rounded-bottom">
                        <ReactMarkdown>{post?.short}</ReactMarkdown>
                    </Container>
                    </>
                    :
                    <p>Hier wird die Beschreibung angezeigt</p>
                }
                { post?.content ? 
                    <>
                    <Container className="boxshadow px-4 secondary-color rounded-top">
                        Inhalt
                    </Container>
                    <Container className="boxshadow p-4 rounded-bottom">
                        <ReactMarkdown>{post?.content}</ReactMarkdown>
                    </Container>
                    </>
                    :
                    <p>Hier wird der Inhalt angezeigt</p>
                }
                </Col>
            
            </Row>
        </>
    )
}

export default PostEditor