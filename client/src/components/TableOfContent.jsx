import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from "./LoadingSpinner"

import axios from "axios"
import { Link } from "react-router-dom"
import { PostContext } from "../context/postContext"

const TableOfContent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [postLinks, setPostLinks] = useState([])

    // loading the correct sub site
    const { setParentId, setCurrentPostId, parentId, currentPostId } = useContext(PostContext)

    // sorting links ################################### s

    function sortItems(items) {
        const sorted = [];
    
        function addChildrenToSorted(parent_Id) {
            const children = items.filter(item => item.parentid === parent_Id);
            for (const child of children) {
                sorted.push(child);
                addChildrenToSorted(child.id); // Recursively look for its children.
            }
        }
    
        // Start with root items (those with parentid of 0).
        const roots = items.filter(item => item.parentid === 0);
        for (const root of roots) {
            sorted.push(root);
            addChildrenToSorted(root.id);
        }
    
        return sorted;
    }

    // sorting links ################################### - e
    
    useEffect(() => {
        console.log("trying to fetch links from: " + parentId)
        const fetchData = async () => {
            try {
                const res = await axios.get("/links/", { params: { parentId: parentId }})
                console.log(res.data)
                console.log(sortItems(res.data))
                setPostLinks(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)

        // sort array
    }, [currentPostId])

    const handleClick = (post, parent) => {
        setCurrentPostId(post)
        setParentId(parent)
    } 

    return (
        <>
            <h3>Table Of Contents</h3>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            {
                postLinks.map(post => {
                    return (  
                    <Row>
                        <Col sm={12}>
                            <Link key={"toc-" + post.id} className={ post.id == currentPostId ? "active font-weight-light" : "font-weight-light"} onClick={() => handleClick(post.id, post.parentid)}>id: {post.id} pr: {post.parentid} ti: {post.title}</Link>
                        </Col>
                    </Row>
                )})
            }
        </>
    )
}

export default TableOfContent