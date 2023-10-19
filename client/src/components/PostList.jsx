import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import LoadingSpinner from "./LoadingSpinner"
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

import axios from "axios"
import { PostContext } from "../context/postContext"

const PostList = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ posts, setPosts ] = useState([])

    // loading the correct sub site
    const { replaceSpaces, setCurrentPostTitle, parentId, setParentId, setCurrentPostId, currentPostId } = useContext(PostContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/", { params: { parentId: currentPostId }})
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [currentPostId])

    return (
        <>
            { posts.length >= 0 ? <h3>Unterseiten</h3> : ""}
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            {posts.map(post => {
                return (  
                <Row key={"posts-" + post.id} className="another-color px-2 py-4 my-2">
                    <Col sm={4}>
                        <Image
                            src={post.image}
                            fluid
                        ></Image>
                    </Col>
                    <Col sm={8}>
                        <h4 className='font-weight-light'>{post.title}</h4>
                        <ReactMarkdown>{post.short}</ReactMarkdown>
                        <Link to={"/doku/" + post.id + "/" + replaceSpaces(post.title)} className="mt-2">Beitrag anzeigen</Link>
                    </Col>
                    
                </Row>
            )})}
        </>
    )
}

export default PostList