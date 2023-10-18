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
    const { currentPostId } = useContext(PostContext)

    // sorting links ################################### s

    function buildTableOfContentsWithIndents(entries, parent_id = 0, level = 0) {
        const result = [];
      
        const sortedEntries = entries
            .filter((entry) => parseInt(entry.parentid) === parent_id)
            .sort((a, b) => a.title.localeCompare(b.title));
      
        for (const entry of sortedEntries) {
            const indents = level + 1;
            const entryWithIndent = { ...entry, indents };
        
            result.push(entryWithIndent);
            
            const subContents = buildTableOfContentsWithIndents(entries, parseInt(entry.id), indents);
            if (subContents.length > 0) {
                result.push(...subContents);
            }
        }

        return result;
      }

    // sorting links ################################### - e
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/links/")
                
                setPostLinks(buildTableOfContentsWithIndents(res.data))
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)

        // sort array
    }, [currentPostId])

    return (
        <>
            <h3>Table Of Contents</h3>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            { postLinks.map(post => {
                const indentsAsArray = Array.from({ length: post.indents - 1})
                return (
                    <Row className="toc-row">
                        <Col sm={12}>
                            {indentsAsArray.map(i => {
                                return(<span className={ post.id == currentPostId ? "active cursor-pointer" : "cursor-pointer not-active"}>. . </span>)
                            })}
                            <Link 
                                to={"/doku/" + post.id + "/" + post.title}
                                key={"toc-" + post.id} 
                                className={ post.id == currentPostId ? "active toc-link" : "toc-link text-decoration-none"} 
                            >{post.title}</Link>
                        </Col>
                    </Row>
                )
            })}
        </>
    )
}

export default TableOfContent