import React, { useContext, useEffect, useState, useRef } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import LoadingSpinner from "./LoadingSpinner"

import axios from "axios"
import { PostContext } from "../context/postContext"
import { useLocation } from "react-router-dom"

const OnSitePost = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState({})
    const { currentPostId } = useContext(PostContext)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/" + currentPostId)
                setPost(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData();
        setIsLoading(false)
    }, [currentPostId])

    return (
        <>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            <Col sm={5}>
                <Image
                    src={post?.image}
                    fluid
                ></Image>
            </Col>
            <Col sm={7}>
                <h1 className='font-weight-light'>{post?.title}</h1>
                <p className="mt-4">{post?.short}</p>
            </Col>
            <hr className="my-4"></hr>
            <Container>
                {post?.content}
            </Container>
        </>
    )
}

export default OnSitePost