import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from "axios";
import { Link } from "react-router-dom";
import { PostContext } from "../context/postContext"


const TableOfContent = (props) => {
    console.log("mounting")
    const [postLinks, setPostLinks] = useState([])

    // loading the correct sub site
    const { setParentId, setCurrentPostId } = useContext(PostContext)

    useEffect(() => {
        console.log("trying to fetch links")
        const fetchData = async () => {
            try {
                const res = await axios.get("/links/")
                setPostLinks(res.data)
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
            <h3>Table Of Content</h3>
            {postLinks.map(post => {
                return (  
                <Row key={post.id}>
                    <Col sm={12}>
                        <Link className='font-weight-light' onClick={() => handleClick(post.id, post.parentid)}>pr: {post.parentid} ti: {post.title}</Link>
                    </Col>
                </Row>
            )})}
        </>
    )
}

export default TableOfContent