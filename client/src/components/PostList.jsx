import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/esm/Image";
import Button from 'react-bootstrap/Button'

import axios from "axios";
import { PostContext } from "../context/postContext"


const PostList = (props) => {
    console.log("mounting")
    const [posts, setPosts] = useState([])

    // loading the correct sub site
    const { parentId, setParentId, setCurrentPostId } = useContext(PostContext)

    useEffect(() => {
        const fetchData = async () => {
            const localParentId = parentId.length > 0 ? parentId : 0
            console.log("><>> " + localParentId + " - " + parentId + " - " + parentId.length)
            try {
                const res = await axios.get("/posts/", { params: { parentId: parentId }})
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const handleClick = (post, parent) => {
        setCurrentPostId(post)
        setParentId(parent)
    }


    return (
        <>
            <h3>Unterseiten</h3>
            {posts.map(post => {
                return (  
                <Row key={post.id}>
                    <Col sm={3}>
                        <Image
                            src={post.image}
                            fluid
                        ></Image>
                    </Col>
                    <Col sm={9}>
                        <h3 className='font-weight-light'>{post.title} - <Button onClick={() => handleClick(post.id, post.parentid)}>Mehr Anzeigen</Button></h3>
                        <p className="mt-4">{post.short}</p>
                    </Col>
                </Row>
            )})}
        </>
    )
}

export default PostList