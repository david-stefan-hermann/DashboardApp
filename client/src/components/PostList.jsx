import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import LoadingSpinner from "./LoadingSpinner"
import { Link } from "react-router-dom"

import axios from "axios"
import { PostContext } from "../context/postContext"


const PostList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts, setSubSitesExist] = useState([])

    // loading the correct sub site
    const { parentId, setParentId, setCurrentPostId, currentPostId } = useContext(PostContext)

    useEffect(() => {
        const fetchData = async () => {
            const localParentId = currentPostId == null || currentPostId < 0 ? 999 : currentPostId
            try {
                const res = await axios.get("/posts/", { params: { parentId: localParentId }})
                setPosts(res.data)
                posts.length > 0 ? setSubSitesExist(true) : setSubSitesExist(false)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [parentId])

    const handleClick = (post, parent) => {
        setCurrentPostId(post)
        setParentId(parent)
    }


    return (
        <>
            <h3>Unterseiten</h3>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            {posts.map(post => {
                return (  
                <Row key={"posts-" + post.id} className="another-color px-2 py-4 my-2 rounded">
                    <Col sm={4}>
                        <Image
                            src={post.image}
                            fluid
                            rounded
                        ></Image>
                    </Col>
                    <Col sm={8}>
                        <h4 className='font-weight-light'>{post.title}</h4>
                        <p className="mt-4">{post.short}</p>
                        <Link className="mt-2" onClick={() => handleClick(post.id, post.parentid)}>Beitrag anzeigen</Link>
                    </Col>
                </Row>
            )})}
        </>
    )
}

export default PostList