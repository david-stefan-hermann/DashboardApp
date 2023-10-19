import React, { useContext, useEffect, useState, useRef } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import LoadingSpinner from "./LoadingSpinner"
import { AuthContext } from "../context/authContext"
import { PencilFill } from "react-bootstrap-icons"
import Moment from 'moment'

import axios from "axios"
import { PostContext } from "../context/postContext"
import { useLocation, Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

const OnSitePost = () => {
    const { currentUser } = useContext(AuthContext)
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
        fetchData()
        setIsLoading(false)
    }, [currentPostId])

    return (
        <>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            <Row>
                <h1 className='font-weight-light'>{post?.title}</h1>
                <h6 className="fst-italic">{post?.username}, {Moment(post?.updated).format("DD.MM.YYYY, HH:mm")}</h6>
                { currentUser?.id == post?.uid ?
                    // edit button
                    <Link 
                        to={"edit"}
                        className="text-decoration-none" 
                    ><PencilFill /> Diesen Beitrag bearbeiten</Link> : ""
                }
                <p className="mt-4">{post?.short}</p>                
            </Row>
            <Row>
                <Container>
                    <Image
                        width="50%"
                        src={post?.image}
                        fluid
                    ></Image>
                </Container>
            </Row>
            <Row>
                <hr className="my-4"></hr>
                <ReactMarkdown>{post?.content}</ReactMarkdown>
            </Row>
        </>
    )
}

export default OnSitePost