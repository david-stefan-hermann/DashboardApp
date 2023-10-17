import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import LoadingSpinner from "./LoadingSpinner"
import Card from 'react-bootstrap/Card';

import axios from "axios"
import { PostContext } from "../context/postContext"


const SiteLocation = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [siteLocation, setSiteLocation] = useState([])

    // loading the correct sub site
    const { goToTopLevel, parentId, setParentId, setCurrentPostId, currentPostId } = useContext(PostContext)

    // parent id for loop
    let searchForParent = parentId

    const findById = async id => {
        if (id == 0 || !id || id == null) {
        } else {
            try {
                const res = await axios.get("/location/" + id)
                //setLoopCurrentId(res.data[0].parentid)
                
                findById(res.data[0].parentid)
                
                setSiteLocation(oldSiteLocation => [res.data[0], ...oldSiteLocation])                
            } catch(err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        // clear site location
        setSiteLocation([])
        findById(currentPostId)
        setIsLoading(false)
    }, [currentPostId])

    const handleClick = (post, parent) => {
        setCurrentPostId(post)
        setParentId(parent)
    }

    return (
        <>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            <Card text="light" bg="dark">
                <Card.Body>
                    Du befindest dich hier:&nbsp;&nbsp;&nbsp;&nbsp;
                    <Card.Link className="font-weight-light cursor-pointer" onClick={goToTopLevel}>Doku</Card.Link>
                    {siteLocation.map(loc => {
                        return (
                        <>&nbsp;&nbsp;&nbsp;&nbsp;&gt;
                        <Card.Link key={"loc-" + loc.id} className={ loc.id == currentPostId ? "active font-weight-light cursor-pointer" : "font-weight-light cursor-pointer"} onClick={() => handleClick(loc.id, loc.parentid)}>{loc.title}</Card.Link></>
                        )
                    })}
                    </Card.Body>
            </Card>
        </>
    )
}

export default SiteLocation